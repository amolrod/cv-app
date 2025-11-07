import { NextResponse } from "next/server";

export const POST = async () => {
  return NextResponse.json(
    {
      message:
        "Exportación server-side a PDF aún no está disponible. Usa la opción de impresión del navegador por ahora.",
    },
    { status: 501 }
  );
};
