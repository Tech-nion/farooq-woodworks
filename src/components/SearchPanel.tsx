import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useServices } from '@/hooks/useServices';
import { useWorkers } from '@/hooks/useWorkers';
import { Search, X, Package, Wrench, User, Loader2 } from 'lucide-react';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: products = [], isLoading: loadingProducts } = useProducts(undefined, debouncedQuery);
  const { data: services = [], isLoading: loadingServices } = useServices(undefined, debouncedQuery);
  const { data: workers = [] } = useWorkers();

  const filteredWorkers = workers.filter(w => 
    w.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    w.specialty.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const isLoading = loadingProducts || loadingServices;
  const hasResults = products.length > 0 || services.length > 0 || filteredWorkers.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSelect = (type: 'product' | 'service' | 'worker', id: string) => {
    onClose();
    setQuery('');
    if (type === 'product') navigate(`/product/${id}`);
    else if (type === 'worker') navigate(`/workers/${id}`);
    else navigate('/services');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="container-wide mx-auto pt-20 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="flex items-center gap-4 p-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products, services, workers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-lg"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start typing to search...</p>
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              </div>
            ) : !hasResults ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="p-4 space-y-6">
                {/* Products */}
                {products.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Products ({products.length})
                    </h3>
                    <div className="space-y-2">
                      {products.slice(0, 5).map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSelect('product', product.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                          </div>
                          <span className="text-primary font-bold">${product.sale_price || product.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                {services.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      Services ({services.length})
                    </h3>
                    <div className="space-y-2">
                      {services.slice(0, 5).map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleSelect('service', service.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Wrench className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{service.name}</p>
                            <p className="text-sm text-muted-foreground">{service.category?.name}</p>
                          </div>
                          <span className="text-primary font-bold">From ${service.min_price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workers */}
                {filteredWorkers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Craftsmen ({filteredWorkers.length})
                    </h3>
                    <div className="space-y-2">
                      {filteredWorkers.slice(0, 5).map((worker) => (
                        <button
                          key={worker.id}
                          onClick={() => handleSelect('worker', worker.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {worker.avatar_url ? (
                              <img src={worker.avatar_url} alt={worker.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg font-serif text-primary">{worker.name.charAt(0)}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{worker.name}</p>
                            <p className="text-sm text-muted-foreground">{worker.specialty}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">⭐ {worker.rating}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/50 text-center text-sm text-muted-foreground">
            Press <kbd className="px-2 py-1 rounded bg-background border text-xs">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
