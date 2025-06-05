const { z } = require("zod");

const planNutricionalSchema = z.object({
    usuario_id: z.number().int().positive({ message: "El usuario_id debe ser un número positivo." }),
    objetivo: z.enum(["Perder Grasa", "Ganar Masa Muscular", "Mantener Peso"]),
    sexo: z.enum(["Masculino", "Femenino"]),
    edad: z.number().int().positive(),
    altura: z.number().positive(),
    peso: z.number().positive(),
    nivel_actividad: z.enum([
        "Sedentario", "Ligera Actividad", "Moderadamente Activo", "Muy Activo", "Extremadamente Activo"
    ]),
    entrenamiento_fuerza: z.boolean(),
    ingredientes_seleccionados: z.string(),
    calorias_diarias: z.number().int().positive(),
    proteinas_diarias: z.number().positive(),
    carbohidratos_diarios: z.number().positive(),
    grasas_diarias: z.number().positive(),
    consumo_agua_diario: z.number().positive().optional(),
    plan_semanal: z.string(),
    tipo_plan: z.enum(["Gratis", "Pago"]),
    funciones_limitadas: z.boolean(),
    fecha_activacion: z.string().datetime().optional(),
    fecha_expiracion: z.string().datetime().optional(),
    estado_plan: z.enum(["Activo", "Cancelado", "Finalizado"])
});

module.exports = planNutricionalSchema;
