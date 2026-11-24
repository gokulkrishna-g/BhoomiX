import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { Map as MapLibreMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { 
  Rotate3d, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Layers, 
  MapPin, 
  Droplets, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  X, 
  CloudRain, 
  Navigation, 
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Mountain,
  Waves,
  Eye,
  Filter,
  Maximize2
} from 'lucide-react';
import { Language } from '../types';
import { 
  TAMIL_NADU_DISTRICTS, 
  AGRO_CLIMATIC_ZONES, 
  DistrictAgriData, 
  TN_DISTRICT_NAMES,
  getDistrictAreas,
  searchTamilNaduAreas,
  DistrictAreaItem
} from '../data/tamilNaduData';
import { getDistrictSoilProfile } from '../data/districtSoilProfiles';

interface TamilNaduAgriMapViewProps {
  language: Language;
  onNavigate?: (view: string) => void;
  currentDistrict?: string;
  onSelectDistrict?: (district: string) => void;
}

// Basemap Styles
const MAP_STYLES = {
  satellite: {
    name: 'Satellite Photoreal',
    version: 8 as const,
    sources: {
      'esri-satellite': {
        type: 'raster' as const,
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        attribution: 'Esri World Imagery'
      }
    },
    layers: [
      {
        id: 'satellite-layer',
        type: 'raster' as const,
        source: 'esri-satellite',
        minzoom: 0,
        maxzoom: 19
      }
    ]
  },
  terrain: {
    name: 'Topographic Relief',
    version: 8 as const,
    sources: {
      'esri-topo': {
        type: 'raster' as const,
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        attribution: 'Esri World Topo Map'
      }
    },
    layers: [
      {
        id: 'topo-layer',
        type: 'raster' as const,
        source: 'esri-topo',
        minzoom: 0,
        maxzoom: 19
      }
    ]
  }
};

// Regional Agro-Zone Color Accents
const ZONE_COLORS: Record<string, string> = {
  "Cauvery Delta Zone": "#10B981",    // Emerald
  "North Eastern Zone": "#3B82F6",    // Blue
  "Western Zone": "#F59E0B",          // Amber
  "North Western Zone": "#8B5CF6",    // Purple
  "Southern Zone": "#EF4444",          // Red
  "High Rainfall Zone": "#06B6D4",    // Cyan
  "Hilly and High Altitude Zone": "#059669" // Forest Green
};

export const TamilNaduAgriMapView: React.FC<TamilNaduAgriMapViewProps> = ({
  language,
  onNavigate,
  currentDistrict = "Thanjavur",
  onSelectDistrict
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const [selectedDistrictName, setSelectedDistrictName] = useState<string>(currentDistrict);
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [activeBasemap, setActiveBasemap] = useState<'satellite' | 'terrain'>('satellite');
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [currentBearing, setCurrentBearing] = useState<number>(-12);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showCardDrawer, setShowCardDrawer] = useState<boolean>(true);

  // Sync with prop when parent changes
  useEffect(() => {
    if (currentDistrict && currentDistrict !== selectedDistrictName) {
      setSelectedDistrictName(currentDistrict);
    }
  }, [currentDistrict]);

  const selectedDistrictData: DistrictAgriData = useMemo(() => {
    return TAMIL_NADU_DISTRICTS[selectedDistrictName] || TAMIL_NADU_DISTRICTS["Thanjavur"];
  }, [selectedDistrictName]);

  const soilProfile = useMemo(() => {
    return getDistrictSoilProfile(selectedDistrictName);
  }, [selectedDistrictName]);

  const districtAreas = useMemo(() => {
    return getDistrictAreas(selectedDistrictName);
  }, [selectedDistrictName]);

  // Autocomplete matching districts AND specific sub-district taluks/areas
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { districts: [], areas: [] };
    const q = searchQuery.toLowerCase().trim();

    const matchedDistricts = Object.values(TAMIL_NADU_DISTRICTS).filter(d => 
      d.name.toLowerCase().includes(q) || d.tamil_name.includes(q)
    ).slice(0, 4);

    const matchedAreas = searchTamilNaduAreas(q).slice(0, 7);

    return { districts: matchedDistricts, areas: matchedAreas };
  }, [searchQuery]);

  // Fly to specific sub-district area/taluk
  const flyToArea = (distName: string, area: DistrictAreaItem) => {
    setSelectedDistrictName(distName);
    setShowCardDrawer(true);
    setSearchQuery('');
    setIsSearchOpen(false);

    if (onSelectDistrict) {
      onSelectDistrict(distName);
    }

    if (mapRef.current) {
      const targetLon = area.lon ?? TAMIL_NADU_DISTRICTS[distName]?.lon ?? 78.6569;
      const targetLat = area.lat ?? TAMIL_NADU_DISTRICTS[distName]?.lat ?? 11.1271;
      mapRef.current.flyTo({
        center: [targetLon, targetLat],
        zoom: 11.8,
        pitch: is3DMode ? 62 : 0,
        bearing: -15,
        speed: 1.2,
        curve: 1.4,
        essential: true
      });
    }
  };

  // Fly to district smoothly
  const flyToDistrict = (distName: string) => {
    setSelectedDistrictName(distName);
    setShowCardDrawer(true);
    setSearchQuery('');
    setIsSearchOpen(false);

    if (onSelectDistrict) {
      onSelectDistrict(distName);
    }

    const dist = TAMIL_NADU_DISTRICTS[distName];
    if (dist && mapRef.current) {
      mapRef.current.flyTo({
        center: [dist.lon, dist.lat],
        zoom: 9.8,
        pitch: is3DMode ? 60 : 0,
        bearing: -15,
        speed: 1.2,
        curve: 1.4,
        essential: true
      });
    }
  };

  // Toggle 3D Perspective (60° tilt) vs 2D Top-down (0° tilt)
  const toggle3DMode = () => {
    if (!mapRef.current) return;
    const target3D = !is3DMode;
    setIs3DMode(target3D);
    mapRef.current.easeTo({
      pitch: target3D ? 60 : 0,
      bearing: target3D ? -15 : 0,
      duration: 1000
    });
  };

  // Reset Compass to North
  const resetNorth = () => {
    if (!mapRef.current) return;
    mapRef.current.easeTo({
      bearing: 0,
      duration: 600
    });
  };

  // Switch Basemap Style
  const switchBasemap = (type: 'satellite' | 'terrain') => {
    if (!mapRef.current || activeBasemap === type) return;
    setActiveBasemap(type);
    mapRef.current.setStyle(MAP_STYLES[type]);
    mapRef.current.once('style.load', () => {
      if (mapRef.current) {
        renderDistrictMarkers(mapRef.current);
      }
    });
  };

  // Region View Presets
  const setRegionView = (region: 'all' | 'ghats' | 'delta' | 'south' | 'kongu') => {
    if (!mapRef.current) return;
    switch (region) {
      case 'all':
        mapRef.current.flyTo({
          center: [78.6569, 11.1271],
          zoom: 7.2,
          pitch: is3DMode ? 55 : 0,
          bearing: -10,
          duration: 1500
        });
        break;
      case 'ghats':
        // Western Ghats elevation (Nilgiris, Anamalai, Cardamom Hills)
        mapRef.current.flyTo({
          center: [76.9558, 11.0168],
          zoom: 8.6,
          pitch: 65,
          bearing: -28,
          duration: 1500
        });
        break;
      case 'delta':
        // Cauvery Delta Basin (Thanjavur, Tiruvarur, Mayiladuthurai)
        mapRef.current.flyTo({
          center: [79.25, 10.8],
          zoom: 8.9,
          pitch: 56,
          bearing: -12,
          duration: 1500
        });
        break;
      case 'south':
        // Southern Plain & Vaigai (Madurai, Ramanathapuram, Tirunelveli)
        mapRef.current.flyTo({
          center: [77.85, 9.45],
          zoom: 8.4,
          pitch: 58,
          bearing: -8,
          duration: 1500
        });
        break;
      case 'kongu':
        // Kongu Valley & Palakkad Gap (Coimbatore, Erode, Tiruppur)
        mapRef.current.flyTo({
          center: [77.4, 11.2],
          zoom: 8.6,
          pitch: 60,
          bearing: -18,
          duration: 1500
        });
        break;
    }
  };

  // Initialize MapLibre GL Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialCenter: [number, number] = [78.6569, 11.1271];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES.satellite,
      center: initialCenter,
      zoom: 7.2,
      pitch: 58,
      bearing: -12,
      maxPitch: 85,
      attributionControl: false
    });

    mapRef.current = map;

    map.on('rotate', () => {
      setCurrentBearing(map.getBearing());
    });

    map.on('pitch', () => {
      setIs3DMode(map.getPitch() > 15);
    });

    map.on('load', () => {
      renderDistrictMarkers(map);
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      map.remove();
    };
  }, []);

  // Update markers when district selection or zone filter changes
  const renderDistrictMarkers = (map: MapLibreMap) => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const districts = Object.values(TAMIL_NADU_DISTRICTS).filter(d => 
      selectedZone === 'All' || d.zone === selectedZone
    );

    districts.forEach(dist => {
      const isSelected = dist.name === selectedDistrictName;
      const zoneColor = ZONE_COLORS[dist.zone] || '#10B981';

      // Custom marker displaying ONLY the district name
      const el = document.createElement('div');
      el.className = 'district-marker-pin';
      el.style.cursor = 'pointer';
      el.style.transform = isSelected ? 'scale(1.25)' : 'scale(1.0)';
      el.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.zIndex = isSelected ? '50' : '10';

      // Strictly district name only, ZERO crop names or product labels
      el.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.55));
        ">
          <div style="
            background: ${isSelected ? '#ffffff' : 'rgba(15, 23, 42, 0.92)'};
            color: ${isSelected ? '#064e3b' : '#ffffff'};
            border: 2px solid ${isSelected ? '#10B981' : 'rgba(255,255,255,0.75)'};
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 800;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            letter-spacing: 0.2px;
          ">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${zoneColor}; display: inline-block;"></span>
            <span>${language === 'ta' ? dist.tamil_name : dist.name}</span>
          </div>

          <svg width="22" height="30" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 12 32 12 32C12 32 24 18.6274 24 12C24 5.37258 18.6274 0 12 0Z" fill="${zoneColor}"/>
            <circle cx="12" cy="11" r="5" fill="#ffffff"/>
            <circle cx="12" cy="11" r="2.8" fill="${isSelected ? '#10B981' : zoneColor}"/>
          </svg>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        flyToDistrict(dist.name);
      });

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([dist.lon, dist.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  // Re-render markers when filter changes
  useEffect(() => {
    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      renderDistrictMarkers(mapRef.current);
    }
  }, [selectedZone, selectedDistrictName, language]);

  return (
    <div className="relative w-full h-[calc(100vh-5.5rem)] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950 flex flex-col">
      {/* Top Interactive Glass Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: District Search & Zone Filter */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* District & Sub-District Search Input */}
          <div className="relative">
            <div className="flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 shadow-lg w-72 sm:w-80">
              <Search className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder={language === 'ta' ? 'மாவட்டம் / பகுதி (எ.கா: கும்பகோணம், பொள்ளாச்சி)...' : 'Search District or Area (e.g. Kumbakonam, Pollachi)...'}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Enhanced Autocomplete Dropdown: Districts & Authentic Taluk Areas */}
            {isSearchOpen && (searchResults.districts.length > 0 || searchResults.areas.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl max-h-72 overflow-y-auto z-30 custom-scrollbar">
                {/* District Matches */}
                {searchResults.districts.length > 0 && (
                  <div className="p-1">
                    <p className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {language === 'ta' ? 'மாவட்டங்கள் (Districts)' : 'Tamil Nadu Districts'}
                    </p>
                    {searchResults.districts.map((dist) => (
                      <button
                        key={dist.name}
                        onClick={() => flyToDistrict(dist.name)}
                        className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-emerald-600/30 hover:text-white flex items-center justify-between rounded-lg transition-colors"
                      >
                        <span className="font-bold flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          {language === 'ta' ? dist.tamil_name : dist.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{dist.zone}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Specific Taluk / Town / Agricultural Area Matches */}
                {searchResults.areas.length > 0 && (
                  <div className="p-1 border-t border-slate-800">
                    <p className="px-2 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {language === 'ta' ? 'வட்டாரங்கள் & பகுதிகள் (Taluks & Places)' : 'Specific Areas & Taluks'}
                    </p>
                    {searchResults.areas.map((item, idx) => (
                      <button
                        key={`${item.district}-${item.area.name}-${idx}`}
                        onClick={() => flyToArea(item.district, item.area)}
                        className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-amber-600/20 hover:text-white flex items-center justify-between rounded-lg transition-colors group"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1">
                            <Navigation className="w-3 h-3 text-amber-400" />
                            {language === 'ta' ? item.area.tamil_name : item.area.name}
                          </span>
                          {item.area.specialty && (
                            <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
                              {item.area.specialty}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
                          {language === 'ta' ? item.district_ta : item.district}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Agro-Climatic Zone Filter Chip Dropdown */}
          <div className="hidden md:flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 shadow-lg">
            <Filter className="w-3.5 h-3.5 text-amber-400 mr-2" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">
                {language === 'ta' ? 'அனைத்து மண்டலங்கள் (7)' : 'All 7 Agro Zones'}
              </option>
              {Object.keys(AGRO_CLIMATIC_ZONES).map((z) => (
                <option key={z} value={z} className="bg-slate-900 text-white">
                  {z}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Geographical View Presets & Perspective Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Basemap Toggle */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-lg text-xs">
            <button
              onClick={() => switchBasemap('satellite')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                activeBasemap === 'satellite' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {language === 'ta' ? 'செயற்கைக்கோள்' : 'Satellite'}
            </button>
            <button
              onClick={() => switchBasemap('terrain')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                activeBasemap === 'terrain' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {language === 'ta' ? 'நிலப்பரப்பு' : 'Terrain'}
            </button>
          </div>

          {/* Region Fly-To Presets */}
          <div className="hidden lg:flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-lg text-xs">
            <button 
              onClick={() => setRegionView('all')}
              className="px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium"
            >
              {language === 'ta' ? 'தமிழ்நாடு' : 'Full TN'}
            </button>
            <button 
              onClick={() => setRegionView('ghats')}
              className="px-2.5 py-1.5 text-emerald-300 hover:text-white hover:bg-emerald-950/40 rounded-lg transition-colors font-medium flex items-center gap-1"
            >
              <Mountain className="w-3 h-3" />
              {language === 'ta' ? 'மேற்கு தொடர்ச்சி மலை' : 'Western Ghats'}
            </button>
            <button 
              onClick={() => setRegionView('delta')}
              className="px-2.5 py-1.5 text-teal-300 hover:text-white hover:bg-teal-950/40 rounded-lg transition-colors font-medium flex items-center gap-1"
            >
              <Waves className="w-3 h-3" />
              {language === 'ta' ? 'காவிரி டெல்டா' : 'Cauvery Delta'}
            </button>
            <button 
              onClick={() => setRegionView('south')}
              className="px-2.5 py-1.5 text-amber-300 hover:text-white hover:bg-amber-950/40 rounded-lg transition-colors font-medium"
            >
              {language === 'ta' ? 'தென் மண்டலம்' : 'South Basin'}
            </button>
          </div>

          {/* 3D Perspective vs 2D Top-down Toggle */}
          <button
            onClick={toggle3DMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-lg transition-all border ${
              is3DMode 
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/30 ring-2 ring-emerald-400/30' 
                : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:text-white'
            }`}
          >
            <Rotate3d className="w-4 h-4 animate-spin-slow" />
            <span>{is3DMode ? '3D View' : '2D Map'}</span>
          </button>

          {/* Compass Reset North */}
          <button
            onClick={resetNorth}
            className="p-2 rounded-xl bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:text-white shadow-lg"
            title="Reset to North"
          >
            <Compass 
              className="w-4 h-4 transition-transform duration-300 text-amber-400" 
              style={{ transform: `rotate(${-currentBearing}deg)` }}
            />
          </button>
        </div>
      </div>

      {/* MapLibre GL Rendering Canvas */}
      <div ref={mapContainerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing" />

      {/* Bottom Floating Legend Bar */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-3 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-[11px] text-slate-300 shadow-xl pointer-events-auto">
        <span className="font-bold text-white flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          {language === 'ta' ? 'வேளாண் மண்டலங்கள்:' : 'Agro-Climatic Zones:'}
        </span>
        {Object.entries(ZONE_COLORS).slice(0, 4).map(([zone, color]) => (
          <div key={zone} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-slate-300">{zone.replace(" Zone", "")}</span>
          </div>
        ))}
      </div>

      {/* District Agricultural Details Sliding Drawer */}
      {showCardDrawer && selectedDistrictData && (
        <div className="absolute top-16 right-4 bottom-4 w-80 sm:w-96 z-30 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 pointer-events-auto">
          {/* Drawer Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/70 border-b border-slate-700 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: ZONE_COLORS[selectedDistrictData.zone] || '#10B981' }} 
                />
                <h3 className="text-lg font-black text-white tracking-tight">
                  {language === 'ta' ? selectedDistrictData.tamil_name : selectedDistrictData.name}
                </h3>
              </div>
              <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                {selectedDistrictData.zone}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {selectedDistrictData.lat.toFixed(4)}°N, {selectedDistrictData.lon.toFixed(4)}°E • TN District
              </p>
            </div>
            <button
              onClick={() => setShowCardDrawer(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs text-slate-300">
            {/* Key District Agricultural Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  {language === 'ta' ? 'சாகுபடி பரப்பளவு' : 'Cultivable Area'}
                </span>
                <p className="text-sm font-black text-white mt-0.5">
                  {selectedDistrictData.cultivable_area_ha.toLocaleString()} ha
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  {language === 'ta' ? 'ஆண்டு சராசரி மழை' : 'Normal Rainfall'}
                </span>
                <p className="text-sm font-black text-cyan-400 mt-0.5 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5" />
                  {selectedDistrictData.annual_rainfall_mm} mm
                </p>
              </div>
            </div>

            {/* Taluks & Sub-District Agricultural Areas */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'ta' ? 'வட்டாரங்கள் & பகுதிகள் (Taluks & Areas)' : 'Taluks & Agricultural Areas'}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-700/60">
                  {districtAreas.length} {language === 'ta' ? 'பகுதிகள்' : 'Places'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {language === 'ta'
                  ? 'பகுதியைத் தேர்வு செய்து 3D நிலப்பரப்பில் அருகிலிருந்து காண்க:'
                  : 'Click any place to zoom into its local 3D topography & crops:'}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 max-h-40 overflow-y-auto custom-scrollbar">
                {districtAreas.map((area, idx) => (
                  <button
                    key={`${area.name}-${idx}`}
                    onClick={() => {
                      if (area.lat && area.lon && mapRef.current) {
                        mapRef.current.flyTo({
                          center: [area.lon, area.lat],
                          zoom: 11.6,
                          pitch: is3DMode ? 62 : 0,
                          bearing: -15,
                          duration: 1200
                        });
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-emerald-700/80 border border-slate-700/80 hover:border-emerald-400 text-left transition-all cursor-pointer group flex flex-col"
                    title={area.specialty || ''}
                  >
                    <span className="text-[11px] font-bold text-slate-200 group-hover:text-white flex items-center gap-1">
                      <Navigation className="w-2.5 h-2.5 text-amber-400" />
                      {language === 'ta' ? area.tamil_name : area.name}
                    </span>
                    {area.specialty && (
                      <span className="text-[9px] text-emerald-400/90 group-hover:text-emerald-100 truncate max-w-[150px]">
                        {area.specialty}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Major Crops Cultivated */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                {language === 'ta' ? 'முதன்மை பயிர்கள் (TNAU தரவு)' : 'Major Crops Cultivated (TNAU)'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDistrictData.major_crops.map((crop, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-[11px] font-semibold"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Soil Types & Testing Lab Benchmarks */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {language === 'ta' ? 'மண் பரிசோதனை ஆய்வக விவரம்' : 'District Soil Lab Benchmarks'}
              </h4>
              <p className="text-[11px] text-slate-300">
                <strong className="text-white">{language === 'ta' ? 'மண் வகைகள்:' : 'Soil Types:'}</strong>{' '}
                {selectedDistrictData.soil_types.join(', ')}
              </p>
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-700">
                  <span className="text-[9px] text-slate-400 font-bold">pH</span>
                  <p className="text-xs font-extrabold text-amber-400">{soilProfile.ph}</p>
                </div>
                <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-700">
                  <span className="text-[9px] text-slate-400 font-bold">N (kg/ha)</span>
                  <p className="text-xs font-extrabold text-emerald-400">{soilProfile.n}</p>
                </div>
                <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-700">
                  <span className="text-[9px] text-slate-400 font-bold">P (kg/ha)</span>
                  <p className="text-xs font-extrabold text-cyan-400">{soilProfile.p}</p>
                </div>
                <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-700">
                  <span className="text-[9px] text-slate-400 font-bold">K (kg/ha)</span>
                  <p className="text-xs font-extrabold text-purple-400">{soilProfile.k}</p>
                </div>
              </div>
            </div>

            {/* Major Irrigation Sources */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mb-1.5">
                <Droplets className="w-3.5 h-3.5" />
                {language === 'ta' ? 'பாசன ஆதாரங்கள்' : 'Major Irrigation Sources'}
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {selectedDistrictData.irrigation_sources.join(' • ')}
              </p>
            </div>

            {/* Fast Action Shortcuts */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onNavigate && onNavigate('aiAssistant')}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
              >
                <span>{language === 'ta' ? 'AI விவசாய முடிவு உதவியாளர்' : 'Open in AI Farming Assistant'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigate && onNavigate('soilLabs')}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] text-center border border-slate-700 transition-colors cursor-pointer"
                >
                  {language === 'ta' ? 'அருகிலுள்ள ஆய்வகங்கள்' : 'Nearby Soil Labs'}
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('weather')}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] text-center border border-slate-700 transition-colors cursor-pointer"
                >
                  {language === 'ta' ? 'வானிலை ஆலோசனை' : 'Weather Advisory'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TamilNaduAgriMapView;
