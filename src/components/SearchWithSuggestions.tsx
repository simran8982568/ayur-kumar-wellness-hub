import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '@/data/products';
import { healthConcerns } from '@/data/healthConcerns';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'product' | 'category' | 'health-concern';
  slug?: string;
  category?: string;
}

interface SearchWithSuggestionsProps {
  className?: string;
  placeholder?: string;
  isMobile?: boolean;
}

const SearchWithSuggestions: React.FC<SearchWithSuggestionsProps> = ({
  className = "",
  placeholder = "Search products, categories...",
  isMobile = false
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Categories for suggestions
  const categories = [
    { id: 'mens-sexual-health', title: "Men's Sexual Health" },
    { id: 'womens-sexual-health', title: "Women's Sexual Health" },
    { id: 'erectile-dysfunction', title: 'Erectile Dysfunction' },
    { id: 'premature-ejaculation', title: 'Premature Ejaculation' },
    { id: 'hormonal-imbalance', title: 'Hormonal Imbalance' },
    { id: 'infertility-support', title: 'Infertility Support' },
    { id: 'general-wellness', title: 'General Wellness' },
  ];

  // Health concerns from consultation form
  const consultationConcerns = [
    'Erectile Dysfunction',
    'Premature Ejaculation', 
    'Low Libido',
    'Infertility',
    'Hormonal Imbalance',
    'Penis Enlargement',
    "Women's Health"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const newSuggestions: SearchSuggestion[] = [];

    // Add product suggestions
    allProducts.forEach(product => {
      if (product.name.toLowerCase().includes(query) || 
          product.description?.toLowerCase().includes(query)) {
        newSuggestions.push({
          id: `product-${product.id}`,
          title: product.name,
          type: 'product',
          slug: product.slug,
          category: product.category
        });
      }
    });

    // Add category suggestions
    categories.forEach(category => {
      if (category.title.toLowerCase().includes(query)) {
        newSuggestions.push({
          id: `category-${category.id}`,
          title: category.title,
          type: 'category',
          slug: category.id
        });
      }
    });

    // Add health concern suggestions
    consultationConcerns.forEach(concern => {
      if (concern.toLowerCase().includes(query)) {
        newSuggestions.push({
          id: `health-${concern}`,
          title: concern,
          type: 'health-concern'
        });
      }
    });

    // Add health concerns from data
    healthConcerns.forEach(concern => {
      if (concern.title.toLowerCase().includes(query)) {
        newSuggestions.push({
          id: `health-data-${concern.id}`,
          title: concern.title,
          type: 'health-concern',
          slug: concern.slug
        });
      }
    });

    // Limit to 8 suggestions and remove duplicates
    const uniqueSuggestions = newSuggestions
      .filter((suggestion, index, self) => 
        index === self.findIndex(s => s.title === suggestion.title)
      )
      .slice(0, 8);

    setSuggestions(uniqueSuggestions);
    setShowSuggestions(uniqueSuggestions.length > 0);
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop-all?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case 'product':
        if (suggestion.slug) {
          navigate(`/product/${suggestion.slug}`);
        } else {
          navigate(`/shop-all?search=${encodeURIComponent(suggestion.title)}`);
        }
        break;
      case 'category':
        if (suggestion.slug) {
          navigate(`/category/${suggestion.slug}`);
        }
        break;
      case 'health-concern':
        if (suggestion.slug) {
          navigate(`/category/${suggestion.slug}`);
        } else {
          navigate(`/consultation-booking`);
        }
        break;
    }
    setSearchQuery("");
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product': return '🛍️';
      case 'category': return '📂';
      case 'health-concern': return '🏥';
      default: return '🔍';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-white text-[#1C1C2D] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5002B] focus:border-transparent transition-colors duration-200"
            aria-label="Search products"
          />
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                index === selectedIndex ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {suggestion.title}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {suggestion.type.replace('-', ' ')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchWithSuggestions;
