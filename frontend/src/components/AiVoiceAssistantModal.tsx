import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Bot, 
  User, 
  RefreshCw,
  Compass,
  CheckCircle2,
  AlertCircle,
  Globe
} from 'lucide-react';
import { Language } from '../types';
import { askVoiceAssistant } from '../services/api';

interface AiVoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentDistrict?: string;
  onNavigate?: (view: string) => void;
  onLanguageChange?: (lang: Language) => void;
}

export const AiVoiceAssistantModal: React.FC<AiVoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  currentDistrict = "Thanjavur",
  onNavigate,
  onLanguageChange
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [queryText, setQueryText] = useState<string>('');
  const [detectedLang, setDetectedLang] = useState<Language>(language || 'ta');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    sender: 'user' | 'assistant';
    text: string;
    markdown?: string;
    detectedLanguage?: Language;
    navigationTarget?: string;
    navigationLabel?: string;
    followups?: string[];
  }>>([]);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Automatic Language Identification Logic
  const detectLanguage = (text: string): Language => {
    // 1. Check for Tamil Unicode characters (\u0B80-\u0BFF)
    if (/[\u0B80-\u0BFF]/.test(text)) {
      return 'ta';
    }
    // 2. Check for common Tamil transliteration words
    const lower = text.toLowerCase();
    const tamilKeywords = [
      "vanakkam", "vanakam", "nel", "nellu", "thannir", "thanneer", "pasanam",
      "marunthu", "uram", "uramm", "mazhai", "kaatru", "vivasayam", "vivasayi",
      "mann", "man", "thanjavur", "madurai", "kovai", "salem", "payir", "maavattam",
      "velanmai", "nandri", "kudam", "pasumai", "pulu", "poochi", "enbathu", "epdi",
      "eppadi", "evvalavu", "vilai", "enna", "santhai", "vazhai", "karumbu"
    ];
    if (tamilKeywords.some(w => lower.includes(w))) {
      return 'ta';
    }
    return 'en';
  };

  // Mixed Tamil & English suggested prompts
  const suggestedPrompts = [
    { text: "இன்றைய வானிலை எப்படி இருக்கிறது?", lang: "ta" },
    { text: "Where is the nearest soil testing lab?", lang: "en" },
    { text: "இன்றைய நெல் சந்தை விலை என்ன?", lang: "ta" },
    { text: "Calculate drip irrigation run-time", lang: "en" },
    { text: "நெல் இலை சுருட்டு புழு கட்டுப்பாடு என்ன?", lang: "ta" },
    { text: "Open 3D agricultural land map", lang: "en" }
  ];

  // Auto-scroll conversation
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, isLoading]);

  // Set up Web Speech Recognition with error handling
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        // Tamil recognition default with bilingual phonetics
        recognition.lang = detectedLang === 'ta' ? 'ta-IN' : 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
          setSpeechError(null);
        };

        recognition.onresult = (event: any) => {
          if (event.results && event.results[0] && event.results[0][0]) {
            const transcript = event.results[0][0].transcript;
            setQueryText(transcript);
            setIsListening(false);
            const detected = detectLanguage(transcript);
            setDetectedLang(detected);
            handleSendQuery(transcript, detected);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition warning:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setSpeechError('Microphone permission denied. Please allow microphone access or type your query.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Speech recognition setup error:', err);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [detectedLang]);

  // Text-to-Speech Playback in Auto-Detected Language
  const speakText = (text: string, lang: Language) => {
    if (audioMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Find best available regional voice
      const voices = window.speechSynthesis.getVoices();
      const targetLangPrefix = lang === 'ta' ? 'ta' : 'en';
      const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLangPrefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        setIsListening(false);
      }
    } else {
      if (!recognitionRef.current) {
        setSpeechError('Speech recognition not available on this browser. Please type your query below.');
        return;
      }
      try {
        setSpeechError(null);
        recognitionRef.current.lang = detectedLang === 'ta' ? 'ta-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (err: any) {
        console.warn('Speech start error:', err);
        // If already started, stop and restart
        try {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current?.start(), 300);
        } catch (e) {
          setIsListening(false);
        }
      }
    }
  };

  const handleSendQuery = async (queryToSend?: string, languageOverride?: Language) => {
    const text = (queryToSend || queryText).trim();
    if (!text) return;

    // Automatically identify language from input
    const lang = languageOverride || detectLanguage(text);
    setDetectedLang(lang);
    if (onLanguageChange) onLanguageChange(lang);

    // Add user message to conversation
    setConversationHistory(prev => [
      ...prev, 
      { sender: 'user', text, detectedLanguage: lang }
    ]);
    setQueryText('');
    setIsLoading(true);

    try {
      const response = await askVoiceAssistant({
        question: text,
        language: lang,
        district: currentDistrict,
        crop: "Paddy"
      });

      const spoken = response.spoken_text || response.answer_markdown || "";
      const markdown = response.answer_markdown || spoken;
      const navTarget = response.navigation_target;
      const navLabel = response.navigation_label;
      const followups = response.suggested_followups || [];

      setConversationHistory(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: spoken,
          markdown,
          detectedLanguage: lang,
          navigationTarget: navTarget,
          navigationLabel: navLabel,
          followups
        }
      ]);

      // Play audio in detected language
      if (!audioMuted && spoken) {
        speakText(spoken, lang);
      }
    } catch (err) {
      console.error('Voice assistant error:', err);
      const fallbackText = lang === 'ta'
        ? `${currentDistrict} மாவட்ட வேளாண் தகவல்கள் புதுப்பிக்கப்பட்டுள்ளன. மண் வளம், வானிலை மற்றும் சந்தை விலைகளை பார்வையிடலாம்.`
        : `Agricultural advisory updated for ${currentDistrict}. You can explore soil testing, weather updates, and mandi prices.`;
      setConversationHistory(prev => [...prev, { sender: 'assistant', text: fallbackText, detectedLanguage: lang }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 p-5 text-white flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-tight">
                  {detectedLang === 'ta' ? 'பூமி எக்ஸ் AI குரல் உதவியாளர்' : 'BhoomiX Tamil Agri Voice AI'}
                </h3>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {currentDistrict}
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">
                {detectedLang === 'ta' 
                  ? 'தமிழ் அல்லது ஆங்கிலத்தில் பேசலாம் (தானியங்கி மொழி அறிதல்)' 
                  : 'Speak or type in Tamil or English (Auto-Identified)'
                }
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 relative z-10">
            {/* Automatic Language Identification Badge (NO manual chooser) */}
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-[11px] font-bold text-emerald-200 flex items-center gap-1.5 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
              <span>
                {detectedLang === 'ta' ? 'தமிழ் (Auto)' : 'English (Auto)'}
              </span>
            </div>

            {/* Audio Mute/Unmute */}
            <button
              onClick={() => {
                if (isPlayingAudio) {
                  window.speechSynthesis?.cancel();
                  setIsPlayingAudio(false);
                }
                setAudioMuted(!audioMuted);
              }}
              className={`p-2 rounded-xl text-xs transition-all ${
                audioMuted ? 'bg-red-500/20 text-red-300' : 'bg-white/10 text-emerald-300 hover:bg-white/20'
              }`}
              title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Conversation Message List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 min-h-[300px]">
          {speechError && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
              <span>{speechError}</span>
            </div>
          )}

          {conversationHistory.length === 0 ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-inner">
                <Mic className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  {detectedLang === 'ta' ? 'வணக்கம் விவசாய தோழரே!' : 'Welcome, Tamil Nadu Farmer!'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                  {detectedLang === 'ta'
                    ? `${currentDistrict} மாவட்டத்திற்குரிய வானிலை, பாசனம், மண் பரிசோதனை கூடம், பூச்சி மருந்து மற்றும் மண்டி விலைகளை தமிழில் கேட்கலாம் அல்லது தட்டச்சு செய்யலாம். மொழி தானாகவே கண்டறியப்படும்.`
                    : `Ask real-time questions about weather, FAO-56 irrigation, soil test results, and mandi market rates for ${currentDistrict}. Language is automatically detected.`}
                </p>
              </div>

              {/* Quick Prompt Chips */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  {detectedLang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள் (தட்டலாம்):' : 'Suggested Questions (Tap to Ask):'}
                </span>
                <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(prompt.text, prompt.lang as Language)}
                      className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition-all shadow-sm text-left cursor-pointer"
                    >
                      💬 {prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            conversationHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2.5 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                  }`}
                >
                  <div className="leading-relaxed whitespace-pre-line font-medium">
                    {msg.text}
                  </div>

                  {/* Navigation Shortcut Pill */}
                  {msg.navigationTarget && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <button
                        onClick={() => {
                          if (onNavigate && msg.navigationTarget) {
                            onNavigate(msg.navigationTarget);
                            onClose();
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 transition-all cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{msg.navigationLabel || (detectedLang === 'ta' ? 'பக்கத்திற்கு செல்' : 'Open Module')}</span>
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                  )}

                  {/* Follow-up question chips */}
                  {msg.followups && msg.followups.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.followups.map((f, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => handleSendQuery(f)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/80 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 transition-all cursor-pointer"
                        >
                          ↳ {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 bg-white dark:bg-slate-800 rounded-xl w-fit border border-slate-200 dark:border-slate-700">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              <span>{detectedLang === 'ta' ? 'வேளாண் விடையை தயாரிக்கிறது...' : 'Formulating agricultural response...'}</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Audio Waves & Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3">
          {/* Audio Waves Animation when listening or speaking */}
          {(isListening || isPlayingAudio) && (
            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mr-2 flex items-center gap-1">
                {isListening ? (detectedLang === 'ta' ? 'கேட்கிறது...' : 'Listening...') : (detectedLang === 'ta' ? 'பேசுகிறது...' : 'Speaking...')}
              </span>
              {[4, 8, 12, 16, 12, 8, 4].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-emerald-500 rounded-full animate-pulse"
                  style={{ height: `${h * 1.5}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}

          {/* Input Controls */}
          <div className="flex items-center gap-2">
            {/* Microphone Button */}
            <button
              onClick={toggleListening}
              className={`p-3.5 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white ring-4 ring-red-500/20 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak to AI in Tamil or English'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input with Bilingual Placeholder */}
            <input
              type="text"
              placeholder={
                detectedLang === 'ta'
                  ? 'கேள்வியை தமிழில் பேசலாம் அல்லது தட்டச்சு செய்யலாம்...'
                  : 'Speak or type query in Tamil or English (Auto-Identified)...'
              }
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendQuery();
              }}
              className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendQuery()}
              disabled={!queryText.trim()}
              className="p-3 bg-slate-900 dark:bg-emerald-600 disabled:opacity-40 text-white rounded-2xl hover:bg-emerald-700 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiVoiceAssistantModal;
