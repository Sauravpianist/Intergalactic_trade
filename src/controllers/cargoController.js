const Cargo = require('../models/cargo');

const createCargo = async (req, res) => {
  const {origin,destination,weight} = req.body;
  const cargo = new Cargo({origin,destination,weight});
  await cargo.save();
  res.status(201).send(cargo);
};


const getCargoDetails = async (req, res) => {
  const id = req.params.shipmentId;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Shipment ID is required' });
    }

    const cargoDetails = await Cargo.findById(id)
    if (!cargoDetails) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    res.status(200).json(cargoDetails);

  } catch (error) {
    console.error('Error fetching shipment details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports={createCargo,getCargoDetails}