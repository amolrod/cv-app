"use client";

import { ChangeEvent, FocusEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/builder/FormSection";
import { useCv } from "@/providers/cv-provider";
import { normalizeLink } from "@/utils/urls";

export const ProfileForm = () => {
  const {
    state: {
      data: { profile },
    },
    updateProfile,
  } = useCv();

  const handleChange = (field: keyof typeof profile) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateProfile({ [field]: event.target.value });
    };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      updateProfile({ photo: result });
    };
    reader.readAsDataURL(file);
  };

  const handleLinkBlur = (field: "website" | "linkedin" | "github") =>
    (event: FocusEvent<HTMLInputElement>) => {
      const normalized = normalizeLink(field, event.target.value);
      updateProfile({ [field]: normalized });
    };

  return (
    <FormSection
      title="Perfil profesional"
      description="Información clave para la cabecera del CV y enlaces de contacto."
      actions={
        profile.photo ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => updateProfile({ photo: "" })}
          >
            Quitar foto
          </Button>
        ) : null
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Nombre completo</Label>
          <Input
            id="profile-name"
            value={profile.name}
            onChange={handleChange("name")}
            placeholder="Ej. Ada Lovelace"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-title">Título profesional</Label>
          <Input
            id="profile-title"
            value={profile.title}
            onChange={handleChange("title")}
            placeholder="Ej. Senior Frontend Engineer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-target">Objetivo</Label>
        <Textarea
          id="profile-target"
          value={profile.target ?? ""}
          onChange={handleChange("target")}
          placeholder="Describe qué rol buscas y tu propuesta de valor en 1-2 frases."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-summary">Resumen</Label>
        <Textarea
          id="profile-summary"
          value={profile.summary ?? ""}
          onChange={handleChange("summary")}
          placeholder="Resume tu experiencia, impacto y especialidad."
          rows={4}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input
            id="profile-email"
            type="email"
            value={profile.email ?? ""}
            onChange={handleChange("email")}
            placeholder="tu.nombre@correo.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-phone">Teléfono</Label>
          <Input
            id="profile-phone"
            value={profile.phone ?? ""}
            onChange={handleChange("phone")}
            placeholder="+34 600 000 000"
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-location">Ubicación</Label>
          <Input
            id="profile-location"
            value={profile.location ?? ""}
            onChange={handleChange("location")}
            placeholder="Ciudad, País"
            autoComplete="address-level2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-website">Website</Label>
          <Input
            id="profile-website"
            value={profile.website ?? ""}
            onChange={handleChange("website")}
            onBlur={handleLinkBlur("website")}
            placeholder="https://tu-portafolio.dev"
            inputMode="url"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-linkedin">LinkedIn</Label>
          <Input
            id="profile-linkedin"
            value={profile.linkedin ?? ""}
            onChange={handleChange("linkedin")}
            onBlur={handleLinkBlur("linkedin")}
            placeholder="linkedin.com/in/usuario"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-github">GitHub</Label>
          <Input
            id="profile-github"
            value={profile.github ?? ""}
            onChange={handleChange("github")}
            onBlur={handleLinkBlur("github")}
            placeholder="github.com/usuario"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="space-y-2">
          <Label htmlFor="profile-photo-url">Foto (URL)</Label>
          <Input
            id="profile-photo-url"
            value={profile.photo ?? ""}
            onChange={handleChange("photo")}
            placeholder="https://cdn.site/avatar.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-photo-file">Subir archivo</Label>
          <Input
            id="profile-photo-file"
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
        </div>
      </div>
    </FormSection>
  );
};
