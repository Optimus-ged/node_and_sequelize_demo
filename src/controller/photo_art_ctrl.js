// Importing dependancies
import PhotoArt from "../models/photo_art_mdl";
import Article from "../models/article_mdl";

const photoArtCtrl = {
  // Getting all article photos
  getPhotosArt: async (req, res) => {
    let response = await PhotoArt.findAll().catch((err) => console.error(err));
    if (response) {
      return res.status(200).json({
        status: 200,
        length: response.length,
        response: response,
      });
    }
  },

  // Handling post request
  addPhotoArt: async (req, res) => {
    let artExist = await Article.findOne({
      whre: {
        designation: req.body.designation,
      },
    });

    if (!artExist) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "Cet Article n'existe pas !",
        },
      });
    }

    let data = {
      photo_article: req.file.path,
      id_article: artExist.id,
    };

    let response = await PhotoArt.create(data).catch((err) =>
      console.error(err)
    );
    if (!response) {
      return res.status(400).json({
        status: 400,
        message: "Il y a une erreur",
      });
    }

    res.status(201).json({
      status: 201,
      message: "Photo article ajoutee avec succee",
      response: response,
    });
  },
};

// Exporting module
export default photoArtCtrl;