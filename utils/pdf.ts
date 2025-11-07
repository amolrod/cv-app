export type ExportPayload = {
  html: string;
  fileName?: string;
};

export const generatePdfServerSide = async (payload: ExportPayload) => {
  void payload;
  throw new Error(
    "Exportación server-side aún no implementada. Usa la impresión nativa mientras tanto."
  );
};
