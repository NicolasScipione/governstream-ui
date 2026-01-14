import { usuarios } from '@/data/mockData';
import { CommandBar } from '@/components/common/CommandBar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Mail, Shield, Building2 } from 'lucide-react';

export function UsuariosView() {
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
