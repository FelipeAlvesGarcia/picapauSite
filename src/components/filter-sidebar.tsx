import React from 'react';
import { Filter } from 'lucide-react';
import { Form } from 'react-bootstrap';

export function FilterSidebar() {
  const filters = [
    "Experiência",
    "Formação",
    "Localização",
    "Disponibilidade",
    "Área de Atuação",
    "Idiomas",
    "Certificações"
  ];

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white sticky top-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filtros</span>
      </div>
      <div className="space-y-3">
        {filters.map((filter) => (
          <div key={filter} className="flex items-center space-x-2">
            <Form.Check type="checkbox" id={filter} label={filter} />
          </div>
        ))}
      </div>
    </div>
  );
}
