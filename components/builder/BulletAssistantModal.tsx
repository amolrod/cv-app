"use client";

import { FormEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const buildBullet = (
  action: string,
  technology: string,
  metric: string,
  impact: string
) => {
  const segments: string[] = [];
  const trimmedAction = action.trim();
  if (trimmedAction) {
    segments.push(trimmedAction);
  }
  const tech = technology.trim();
  if (tech) {
    segments.push(`con ${tech}`);
  }
  const metricValue = metric.trim();
  if (metricValue) {
    segments.push(`logrando ${metricValue}`);
  }
  const impactValue = impact.trim();
  if (impactValue) {
    segments.push(`(${impactValue})`);
  }
  return segments.join(" ").replace(/\s+/g, " ").trim();
};

type BulletAssistantModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (bullet: string) => void;
};

export const BulletAssistantModal = ({
  open,
  onOpenChange,
  onGenerate,
}: BulletAssistantModalProps) => {
  const [action, setAction] = useState("");
  const [technology, setTechnology] = useState("");
  const [metric, setMetric] = useState("");
  const [impact, setImpact] = useState("");

  const reset = () => {
    setAction("");
    setTechnology("");
    setMetric("");
    setImpact("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!action.trim()) {
      return;
    }
    const bullet = buildBullet(action, technology, metric, impact);
    onGenerate(bullet);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          reset();
        }
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="resume-heading text-xl">
            Generar logro con fórmula STAR
          </DialogTitle>
          <DialogDescription>
            Describe la acción, la tecnología empleada y el resultado cuantificable para generar un bullet claro y enfocado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="bullet-action">Acción</Label>
            <Input
              id="bullet-action"
              value={action}
              onChange={(event) => setAction(event.target.value)}
              placeholder="Ej. Lideré la refactorización del frontend"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bullet-technology">Tecnología</Label>
            <Input
              id="bullet-technology"
              value={technology}
              onChange={(event) => setTechnology(event.target.value)}
              placeholder="Ej. Next.js 14, Tailwind CSS"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bullet-metric">Número / porcentaje</Label>
            <Input
              id="bullet-metric"
              value={metric}
              onChange={(event) => setMetric(event.target.value)}
              placeholder="Ej. +35% en Core Web Vitals"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bullet-impact">Impacto</Label>
            <Input
              id="bullet-impact"
              value={impact}
              onChange={(event) => setImpact(event.target.value)}
              placeholder="Ej. mejorando la tasa de conversión"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Insertar logro</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
