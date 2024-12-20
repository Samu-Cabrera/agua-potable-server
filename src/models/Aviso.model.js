import { Schema, model } from 'mongoose';

const RespuestaSchema = new Schema(
  {
    mensaje: {
      type: String,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);

const AvisoSchema = new Schema(
  {
    mensaje: {
      type: String,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    respuestas: [RespuestaSchema],
    leido: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

AvisoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export default model('Aviso', AvisoSchema);
