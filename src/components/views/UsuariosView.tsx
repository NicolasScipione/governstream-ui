import { useState } from 'react';
import { usuarios } from '@/data/mockData';
import { Usuario } from '@/types/solicitud';
import { CommandBar } from '@/components/common/CommandBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Mail, Shield, Building2, ArrowLeft } from 'lucide-react';

export function UsuariosView() {
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // Detail view — ficha/formulario
  if (selectedUsuario) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <CommandBar showNew={false} showExport={false}>
          <Button variant="ghost" size="sm" onClick={() => setSelectedUsuario(null)} className="mr-auto">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </CommandBar>
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{selectedUsuario.nombre}</h2>
              <p className="text-sm text-muted-foreground">{selectedUsuario.id}</p>
            </div>

            <div className="dashboard-card divide-y divide-border">
              {/* Estado */}
              <div className="flex items-center justify-between py-4 px-2">
                <Label className="text-muted-foreground font-medium">Estado</Label>
                <span className={cn(
                  "badge-status",
                  selectedUsuario.estado === 'activo' ? 'badge-success' : 'badge-initiated'
                )}>
                  {selectedUsuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </Label>
                <span className="text-sm">{selectedUsuario.email}</span>
              </div>

              {/* Roles */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4" /> Roles ({selectedUsuario.roles.length})
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUsuario.roles.map(rol => (
                    <Badge key={rol} variant="secondary" className="text-xs">{rol}</Badge>
                  ))}
                </div>
              </div>

              {/* Mesas de Trabajo */}
              <div className="py-4 px-2">
                <Label className="text-muted-foreground font-medium flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4" /> Mesas de Trabajo ({selectedUsuario.mesasTrabajo.length})
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUsuario.mesasTrabajo.length > 0 ? (
                    selectedUsuario.mesasTrabajo.map(mesa => (
                      <Badge key={mesa} variant="outline" className="text-xs">{mesa}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground italic">Sin mesas asignadas</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid/table view
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar />

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-grid-header sticky top-0">
            <tr className="text-left text-sm">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Rol(es)</th>
              <th className="px-4 py-3 font-semibold">Mesas de Trabajo</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario.id}
                className={cn(
                  "md-grid-row text-sm animate-slide-in cursor-pointer",
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
                onClick={() => setSelectedUsuario(usuario)}
              >
                <td className="px-4 py-3 font-medium text-accent">{usuario.id}</td>
                <td className="px-4 py-3 font-medium">{usuario.nombre}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {usuario.email}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {usuario.roles.map((rol) => (
                      <Badge key={rol} variant="secondary" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        {rol}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {usuario.mesasTrabajo.map((mesa) => (
                      <Badge key={mesa} variant="outline" className="text-xs">
                        <Building2 className="w-3 h-3 mr-1" />
                        {mesa}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "badge-status",
                    usuario.estado === 'activo' ? 'badge-success' : 'badge-initiated'
                  )}>
                    {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
