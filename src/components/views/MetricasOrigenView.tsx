import { CommandBar } from '@/components/common/CommandBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Globe, Phone, Building, Mail, MessageSquare } from 'lucide-react';
const origenData = [{
  origen: 'Centro Comercial General Cabrera',
  cantidad: 523,
  porcentaje: 42,
  icon: Globe,
  color: '#3B82F6'
}, {
  origen: 'Municipio Hernando',
  cantidad: 312,
  porcentaje: 25,
  icon: Building,
  color: '#06B6D4'
}, {
  origen: 'Municipio La Falda',
  cantidad: 234,
  porcentaje: 19,
  icon: Phone,
  color: '#22C55E'
}, {
  origen: 'Cámara Cordobesa del Neumático',
  cantidad: 112,
  porcentaje: 9,
  icon: Mail,
  color: '#EAB308'
}, {
  origen: 'Municipalidad',
  cantidad: 66,
  porcentaje: 5,
  icon: MessageSquare,
  color: '#9CA3AF'
}];
const origenTendencia = [{
  mes: 'Ago',
  web: 78,
  presencial: 45,
  callcenter: 32,
  email: 15,
  municipalidad: 8
}, {
  mes: 'Sep',
  web: 89,
  presencial: 52,
  callcenter: 38,
  email: 18,
  municipalidad: 10
}, {
  mes: 'Oct',
  web: 95,
  presencial: 48,
  callcenter: 41,
  email: 22,
  municipalidad: 12
}, {
  mes: 'Nov',
  web: 102,
  presencial: 55,
  callcenter: 45,
  email: 19,
  municipalidad: 11
}, {
  mes: 'Dic',
  web: 88,
  presencial: 58,
  callcenter: 42,
  email: 20,
  municipalidad: 13
}, {
  mes: 'Ene',
  web: 71,
  presencial: 54,
  callcenter: 36,
  email: 18,
  municipalidad: 12
}];
export function MetricasOrigenView() {
  return <div className="flex flex-col h-full animate-fade-in">
      <CommandBar showNew={false} />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Origin Cards */}
        <div className="grid grid-cols-5 gap-4">
          {origenData.map(origen => {
          const Icon = origen.icon;
          return <div key={origen.origen} className="dashboard-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                backgroundColor: `${origen.color}20`
              }}>
                    <Icon className="w-5 h-5" style={{
                  color: origen.color
                }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">{origen.origen}</h3>
                    <p className="text-xs text-muted-foreground">{origen.porcentaje}% del total</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{origen.cantidad}</p>
              </div>;
        })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Distribución por Origen</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={origenData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="cantidad" nameKey="origen">
                    {origenData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="dashboard-card">
            <h3 className="text-base font-semibold mb-4">Tendencia por Canal</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={origenTendencia}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" tick={{
                  fontSize: 12
                }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{
                  fontSize: 12
                }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} />
                  <Legend wrapperStyle={{
                  fontSize: '11px'
                }} />
                  <Bar dataKey="web" fill="#3B82F6" name="Portal Web" />
                  <Bar dataKey="presencial" fill="#06B6D4" name="Presencial" />
                  <Bar dataKey="callcenter" fill="#22C55E" name="Call Center" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="dashboard-card">
          <h3 className="text-base font-semibold mb-4">Resumen por Camaras/Municipios</h3>
          <table className="w-full text-sm">
            <thead className="bg-grid-header">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Origen</th>
                <th className="px-4 py-3 text-center font-semibold">Total Solicitudes</th>
                <th className="px-4 py-3 text-center font-semibold">Porcentaje</th>
                <th className="px-4 py-3 text-center font-semibold">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {origenData.map((origen, index) => {
              const Icon = origen.icon;
              return <tr key={origen.origen} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{
                      color: origen.color
                    }} />
                        <span className="font-medium">{origen.origen}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">{origen.cantidad}</td>
                    <td className="px-4 py-3 text-center">{origen.porcentaje}%</td>
                    <td className="px-4 py-3 text-center text-green-600">+{Math.floor(Math.random() * 10) + 1}%</td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}