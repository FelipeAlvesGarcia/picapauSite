import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface CurriculumCardProps {
  name: string;
  onRecrutar: () => void;
  onShowDetails: () => void;
}

export function CurriculumCard({ name, onRecrutar, onShowDetails }: CurriculumCardProps) {
  return (
    <Card className="hover:border-primary transition-colors">
      <Card.Body className="p-4">
        <h3 className="font-medium">{name}</h3>
        <Button onClick={onRecrutar} className="mt-2">
          Recrutar
        </Button>
        <Button onClick={onShowDetails} className="mt-2 ml-2">
          Ver Detalhes
        </Button>
      </Card.Body>
    </Card>
  );
}
