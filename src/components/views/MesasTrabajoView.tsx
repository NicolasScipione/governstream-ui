import { mesasTrabajo } from '@/data/mockData';
import { CommandBar } from '@/components/common/CommandBar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Users, FileText } from 'lucide-react';

export function MesasTrabajoView() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <CommandBar />

      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {mesasTrabajo.map((mesa, index) => (
            <div 
              key={mesa.id}
              className="dashboard-card cursor-pointer hover:shadow-card-hover transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
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
                {/* Usuarios */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Usuarios Resolutores ({mesa.usuarios.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mesa.usuarios.map((usuario) => (
                      <Badge key={usuario} variant="secondary" className="text-xs">
                        {usuario}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Formularios */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>Formularios Asociados ({mesa.formularios.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mesa.formularios.map((formulario) => (
                      <Badge key={formulario} variant="outline" className="text-xs">
                        {formulario}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
