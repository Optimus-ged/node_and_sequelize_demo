import Poste from "../models/poste_model";
import agent from "../models/agent_model";
import { Op } from "sequelize";

const posteController = {
  // Handling get-request for all postes
  getPostes: async (req, res) => {
    let _response = await Poste.findAll({
      // where: {
      //   id: {
      //     [Op.and]: {
      //       [Op.eq]: 1,
      //       [Op.gt]: 0,
      //     },
      //   },
      // },
      include: agent,
    }).catch((err) => {
      console.error(err);
    });
    if (_response) {
      return res.status(200).json({
        status: 200,
        message: "All postes getted successfully",
        length: _response.length,
        postes: _response,
      });
    }
  },

  // Handling get-request for one agent
  getOnePoste: async (req, res) => {
    let _id = isNaN(parseInt(req.params.id)) ? 0 : parseInt(req.params.id);
    let _response = await Poste.findOne({ where: _id }).catch((err) => {
      console.error(err);
    });

    if (!_response) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "Poste not found",
        },
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Poste getted successfully",
      response: _response,
    });
  },

  // Handling get request for post by designation
  getPostByName: async (req, res) => {
    let _response = await Poste
      .findOne({
        where: { designation : req.params.desi },
      }).catch((err) => console.error(err));

    if (!_response) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "This post doesn't exist",
        },
      });
    }

    res.status(200).json({
      status: 200,
      message: "Poste successfully getted",
      response: _response,
    });
  },
};

export default posteController;