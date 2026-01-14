import { useState } from 'react';
import { solicitudes, documentos } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Save, 
  Printer, 
  Share2, 
  MoreHorizontal,
  FileText,
  Eye,
  Download,
  Upload,
  Calendar,
  Building2,
  User
} from 'lucide-react';

interface SolicitudDetailProps {
  solicitudId: string;
  onBack: () => void;
}

export function SolicitudDetail({ solicitudId, onBack }: SolicitudDetailProps) {
  const solicitud = solicitudes.find(s => s.id === solicitudId);
  const [activeTab, setActiveTab] = useState('general');

  if (!solicitud) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Solicitud no encontrada</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Command Bar */}
      <div className="command-bar">
        <button onClick={onBack} className="command-btn">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>
        <button className="command-btn command-btn-primary">
          <Save className="w-4 h-4" />
          <span>Guardar</span>
        </button>
        <button className="command-btn">
          <Printer className="w-4 h-4" />
          <span>Imprimir</span>
        </button>
        <button className="command-btn">
          <Share2 className="w-4 h-4" />
          <span>Compartir</span>
        </button>
        <div className="flex-1" />
        <button className="command-btn">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className="px-6 py-4 bg-card border-b border-border">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-foreground">{solicitud.id}</h1>
              <StatusBadge status={solicitud.estado} />
            </div>
            <p className="text-sm text-muted-foreground">{solicitud.categoria} - {solicitud.subcategoria}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span>{solicitud.mesaTrabajo}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{solicitud.usuarioResolutor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content with Tabs */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="gestion">Gestión Operativa</TabsTrigger>
            <TabsTrigger value="documentacion">Documentación</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 animate-fade-in">
            <div className="form-section">
              <h3 className="form-section-title">Datos del Trámite</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>ID de Solicitud</Label>
                  <Input value={solicitud.id} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Fecha de Creación</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={solicitud.fechaCreacion} disabled className="pl-10 bg-muted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Input value={solicitud.categoria} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Subcategoría</Label>
                  <Input value={solicitud.subcategoria} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Origen Institucional</Label>
                  <Input value={solicitud.origenInstitucional} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Mesa de Trabajo</Label>
                  <Input value={solicitud.mesaTrabajo} disabled className="bg-muted" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gestion" className="space-y-6 animate-fade-in">
            <div className="form-section">
              <h3 className="form-section-title">Estado y Asignación</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select defaultValue={solicitud.estado}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initiated">Iniciado</SelectItem>
                      <SelectItem value="review">En revisión</SelectItem>
                      <SelectItem value="progress">En curso</SelectItem>
                      <SelectItem value="pending">Pendiente de información</SelectItem>
                      <SelectItem value="success">Finalizado con éxito</SelectItem>
                      <SelectItem value="failed">Sin resolución</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Usuario Resolutor</Label>
                  <Select defaultValue={solicitud.usuarioResolutor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="María García">María García</SelectItem>
                      <SelectItem value="Carlos López">Carlos López</SelectItem>
                      <SelectItem value="Ana Rodríguez">Ana Rodríguez</SelectItem>
                      <SelectItem value="Pedro Martínez">Pedro Martínez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Prioridad</Label>
                  <Select defaultValue={solicitud.prioridad}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Impacto Estimado</Label>
                  <Select defaultValue={solicitud.impacto}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="provincial">Provincial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Observaciones Internas</h3>
              <Textarea 
                placeholder="Ingrese observaciones internas sobre esta solicitud..."
                defaultValue={solicitud.observaciones}
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent value="documentacion" className="space-y-6 animate-fade-in">
            <div className="form-section">
              <div className="flex items-center justify-between mb-4">
                <h3 className="form-section-title mb-0 pb-0 border-0">Documentos Asociados</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Adjuntar documento
                </Button>
              </div>
              
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-grid-header">
                    <tr className="text-left text-sm">
                      <th className="px-4 py-3 font-semibold">Documento</th>
                      <th className="px-4 py-3 font-semibold">Tipo</th>
                      <th className="px-4 py-3 font-semibold">Fecha</th>
                      <th className="px-4 py-3 font-semibold">Tamaño</th>
                      <th className="px-4 py-3 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentos.map((doc) => (
                      <tr key={doc.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium">{doc.nombre}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{doc.tipo}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{doc.fechaSubida}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{doc.tamaño}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
