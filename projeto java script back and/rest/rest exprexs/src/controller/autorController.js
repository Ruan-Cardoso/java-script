import NaoEncontrado from "../Erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static async listarAutores (req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null){
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }      
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado =  await autor.findByIdAndUpdate(id, req.body);
      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndDelete(id);
      if (autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;