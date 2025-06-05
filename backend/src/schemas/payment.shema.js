const { z } = require("zod");

const paymentSchema = z.object({
  nombre: z.string().min(3, "El nombre es requerido"),  // Mínimo 3 caracteres
  cedula: z.string().min(5, "La cédula es requerida"),  // Mínimo 5 caracteres
  metodo: z.enum(["tarjeta", "nequi"], {
    required_error: "El método de pago es requerido",
  }),
  numero_tarjeta: z.string().length(16, "Debe tener exactamente 16 dígitos").optional(),  // 16 dígitos
  fecha_expiracion: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido, debe ser MM/YY").optional(),
  codigo_seguridad: z.string().length(3, "Debe tener 3 dígitos").optional(),  // 3 dígitos
  numero_nequi: z.string().regex(/^\d{10}$/, "Debe tener exactamente 10 dígitos").optional(),
  monto: z.number().positive("El monto debe ser mayor que cero"),
  estado: z.enum(["pendiente", "completado", "fallido"]).default("pendiente"),  // Establece "pendiente" por defecto
})
.superRefine((data, ctx) => {
  // Validación adicional para métodos de pago específicos
  if (data.metodo === "tarjeta") {
    if (!data.numero_tarjeta) {
      ctx.addIssue({
        path: ["numero_tarjeta"],
        code: z.ZodIssueCode.custom,
        message: "Se requiere información de la tarjeta",
      });
    }
    if (!data.fecha_expiracion) {
      ctx.addIssue({
        path: ["fecha_expiracion"],
        code: z.ZodIssueCode.custom,
        message: "Se requiere la fecha de expiración",
      });
    }
    if (!data.codigo_seguridad) {
      ctx.addIssue({
        path: ["codigo_seguridad"],
        code: z.ZodIssueCode.custom,
        message: "Se requiere el código de seguridad",
      });
    }
  }

  // Validación para el método 'nequi'
  if (data.metodo === "nequi" && !data.numero_nequi) {
    ctx.addIssue({
      path: ["numero_nequi"],
      code: z.ZodIssueCode.custom,
      message: "Se requiere el número Nequi",
    });
  }
});

module.exports = { paymentSchema };
