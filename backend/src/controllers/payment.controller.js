const Payment = require("../models/payment.model");
const Suscripcion = require("../models/suscripcion.model");
const TipoPlan = require("../models/tipoPlan.model");

class PaymentController {
  // 🔹 Método genérico para crear un pago
  async createPayment(req, res, metodo) {
    try {
      // Desestructurar los parámetros enviados en la solicitud
      const { 
        nombre, 
        cedula, 
        numero_tarjeta, 
        fecha_expiracion, 
        codigo_seguridad, 
        numero_nequi, 
        monto, 
        id_usuario, 
        id_suscripcion, 
        id_tipo_plan 
      } = req.body;

      // Validar campos obligatorios
      if (!nombre || !cedula || !monto || !id_usuario) {
        return res.status(400).json({ message: "Faltan campos obligatorios (nombre, cedula, monto, id_usuario)" });
      }

      // Validación para los métodos de pago
      if (metodo === 'tarjeta' && (!numero_tarjeta || !fecha_expiracion || !codigo_seguridad)) {
        return res.status(400).json({ message: "Faltan campos obligatorios para el pago con tarjeta (numero_tarjeta, fecha_expiracion, codigo_seguridad)" });
      }

      if (metodo === 'nequi' && !numero_nequi) {
        return res.status(400).json({ message: "Faltan campos obligatorios para el pago con Nequi (numero_nequi)" });
      }

      // Validación de monto: Debe ser un número mayor que 0
      if (monto <= 0) {
        return res.status(400).json({ message: "El monto debe ser mayor a 0" });
      }

      // Si no se ha proporcionado una suscripción, crearla
      let createdSuscripcion = null;
      if (!id_suscripcion && id_tipo_plan) {
        // Buscar el tipo de plan asociado con el id_tipo_plan
        const tipoPlan = await TipoPlan.findByPk(id_tipo_plan);
        if (!tipoPlan) {
          return res.status(404).json({ message: "Tipo de plan no encontrado" });
        }

        // Calcular fechas de la suscripción
        const fecha_inicio = new Date();
        const fecha_fin = new Date();
        fecha_fin.setDate(fecha_inicio.getDate() + tipoPlan.duracion_dias); // duración del plan

        // Crear la suscripción con la duración del plan
        createdSuscripcion = await Suscripcion.create({
          id_usuario,
          id_tipo_plan: tipoPlan.id_tipo_plan,
          fecha_inicio,
          fecha_fin,
          estado: "activa"
        });

        // Asignar el ID de la nueva suscripción al pago
        id_suscripcion = createdSuscripcion.id_suscripcion;
      }

      // Crear el pago
      const payment = await Payment.create({
        nombre,
        cedula,
        metodo,
        numero_tarjeta,
        fecha_expiracion,
        codigo_seguridad,
        numero_nequi,
        monto,
        estado: "pendiente",
        id_usuario, // ID del usuario
        id_suscripcion // ID de la suscripción (ya sea proporcionado o creado)
      });

      // Responder con el pago registrado
      res.status(201).json({
        message: `Pago registrado exitosamente (${metodo})`,
        payment
      });
    } catch (error) {
      console.error(error); // Mejorar los registros de error
      res.status(500).json({ message: "Error al registrar el pago", error: error.message });
    }
  }

  // 🔹 Pagar con tarjeta
  async pagarConTarjeta(req, res) {
    return this.createPayment(req, res, 'tarjeta');
  }

  // 🔹 Pagar con Nequi
  async pagarConNequi(req, res) {
    return this.createPayment(req, res, 'nequi');
  }

  // 🔹 Obtener todos los pagos
  async getPayments(req, res) {
    try {
      const payments = await Payment.findAll();
      res.status(200).json({ payments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener pagos", error: error.message });
    }
  }

  // 🔹 Obtener un pago por ID
  async getPaymentById(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);

      if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

      res.status(200).json({ payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el pago", error: error.message });
    }
  }

  // 🔹 Actualizar un pago por ID
  async updatePayment(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);

      if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

      await payment.update(req.body);
      res.status(200).json({ message: "Pago actualizado exitosamente", payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el pago", error: error.message });
    }
  }

  // 🔹 Eliminar un pago por ID
  async deletePayment(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);

      if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

      await payment.destroy();
      res.status(200).json({ message: "Pago eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el pago", error: error.message });
    }
  }

// 🔹 Confirmar el pago (cambiar de "pendiente" a "completado")
async confirmarPago(req, res) {
  try {
    const { id } = req.params;

    // Buscar el pago por ID
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    // Verificar que el pago esté en estado pendiente
    if (payment.estado !== "pendiente") {
      return res.status(400).json({ message: "El pago ya ha sido procesado" });
    }

    // Cambiar el estado a "completado"
    await payment.update({ estado: "completado" });

    res.status(200).json({ message: "Pago confirmado exitosamente", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al confirmar el pago", error: error.message });
  }
}
}

module.exports = new PaymentController();
