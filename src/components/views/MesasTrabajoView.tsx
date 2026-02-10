import { useState } from 'react';
import { mesasTrabajo, solicitudes, usuarios } from '@/data/mockData';
import { MesaTrabajo } from '@/types/solicitud';
import { CommandBar } from '@/components/common/CommandBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Users, FolderOpen, Plus, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

// Derive categories from solicitudes
const categoriasDisponibles = Array.from(new Set(solicitudes.map(s => s.categoria)));

// Get users with Resolutor role
const resolutores = usuarios.filter(u => u.roles.includes('Resolutor'));

export function MesasTrabajoView() {
  const [mesas, setMesas] = useState<MesaTrabajo[]>(mesasTrabajo);
  const [selectedMesa, setSelectedMesa] = useState<MesaTrabajo | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create modal state
  const [newNombre, setNewNombre] = useState('');
  const [newCategorias, setNewCategorias] = useState<string[]>([]);
  const [newUsuarios, setNewUsuarios] = useState<string[]>([]);

  const handleCreate = () => {
    if (!newNombre.trim()) return;
    const newMesa: MesaTrabajo = {
      id: `MT-${String(mesas.length + 1).padStart(3, '0')}`,
      nombre: newNombre.trim(),
      descripcion: '',
      estado: 'activa',
      usuarios: newUsuarios,
      categorias: newCategorias,
    };
    setMesas(prev => [...prev, newMesa]);
    setNewNombre('');
    setNewCategorias([]);
    setNewUsuarios([]);
    setShowCreateModal(false);
  };

  const toggleSelection = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  // Detail view — ficha/formulario style
  if (selectedMesa) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <CommandBar showNew={false} showExport={false}>
          <Button variant="ghost" size="sm" onClick={() => setSelectedMesa(null)} className="mr-auto">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </CommandBar>
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{selectedMesa.nombre}</h2>
              <p className="text-sm text-muted-foreground">{selectedMesa.id}</p>
            </div>

            {/* Fields */}
            <div className="dashboard-card divide-y divide-border">
              {/* Estado */}
              <div className="flex items-center justify-between py-4 px-2">
                <Label className="text-muted-foreground font-medium">Estado</Label>
                <span className={cn(
                  "badge-status",
                  selectedMesa.estado === 'activa' ? 'badge-success' : 'badge-initiated'
                )}>
                  {selectedMesa.estado === 'activa' ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              {/* Descripción */}
              {selectedMesa.descripcion && (
                <div className="py-4 px-2">
                  <Label className="text-muted-foreground font-medium block mb-1">Descripción</Label>
                  <p className="text-sm">{selectedMesa.descripcion}</p>
                </div>
              )}

              {/* Usuarios Resolutores */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  Usuarios Resolutores ({selectedMesa.usuarios.length})
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMesa.usuarios.length > 0 ? (
                    selectedMesa.usuarios.map(u => (
                      <Badge key={u} variant="secondary" className="text-xs">{u}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground italic">Sin usuarios asignados</span>
                  )}
                </div>
              </div>

              {/* Categorías Asociadas */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <FolderOpen className="w-4 h-4" />
                  Categorías Asociadas ({selectedMesa.categorias.length})
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMesa.categorias.length > 0 ? (
                    selectedMesa.categorias.map(c => (
                      <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground italic">Sin categorías asociadas</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar onNew={() => setShowCreateModal(true)}>
      </CommandBar>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {mesas.map((mesa, index) => (
            <div
              key={mesa.id}
              className="dashboard-card cursor-pointer hover:shadow-card-hover transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedMesa(mesa)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">{mesa.nombre}</h3>
                    <span className={cn(
                      "badge-status",
                      mesa.estado === 'activa' ? 'badge-success' : 'badge-initiated'
                    )}>
                      {mesa.estado === 'activa' ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{mesa.descripcion}</p>
                </div>
                <span className="text-xs text-muted-foreground">{mesa.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Usuarios Resolutores ({mesa.usuarios.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mesa.usuarios.map(u => (
                      <Badge key={u} variant="secondary" className="text-xs">{u}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <FolderOpen className="w-4 h-4" />
                    <span>Categorías Asociadas ({mesa.categorias.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mesa.categorias.map(c => (
                      <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Crear Mesa */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nueva Mesa de Trabajo</DialogTitle>
            <DialogDescription>Complete los datos para crear una nueva mesa.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre de la Mesa</Label>
              <Input
                value={newNombre}
                onChange={e => setNewNombre(e.target.value)}
                placeholder="Ej: Mesa de Atención Ciudadana"
              />
            </div>

            <div className="space-y-2">
              <Label>Categorías Asociadas</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md max-h-40 overflow-auto">
                {categoriasDisponibles.map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={newCategorias.includes(cat)}
                      onCheckedChange={() => toggleSelection(cat, newCategorias, setNewCategorias)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Usuarios Resolutores (opcional)</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md max-h-40 overflow-auto">
                {resolutores.map(u => (
                  <label key={u.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={newUsuarios.includes(u.nombre)}
                      onCheckedChange={() => toggleSelection(u.nombre, newUsuarios, setNewUsuarios)}
                    />
                    {u.nombre}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={!newNombre.trim()}>Crear Mesa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
