import prisma from "../db/db.config.js";

export const createCar = async (req, res) => {
  const {
    category,
    model,
    number_plate,
    current_city,
    rent_per_hr,
    rent_history,
  } = req.body;

  try {
    const newCar = await prisma.car.create({
      data: {
        category,
        model,
        number_plate,
        current_city,
        rent_per_hr,
      },
    });

    return res.json({
      status: 200,
      car_id: newCar.id,
      message: "Car created successfully.",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "An error occurred while creating car.",
      status: 400,
    });
  }
};

export const getRides = async (req, res) => {
  const { origin, destination, category, required_hours } = req.query;

  console.log(req.query);
  try {
    const cars = await prisma.car.findMany({
      where: {
        category: category,
        current_city: origin,
      },
      include: {
        rent_history: {
          select: {
            origin: true,
            destination: true,
            amount: true,
          },
        },
      },
    });

    var newCar = cars.map(function (e) {
      e.total_payable_amt = e.rent_per_hr * required_hours;
      return e;
    });

    return res.json({
      status: 200,
      cars,
      message: "Cars retrieved successfully.",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "An error occurred while creating car.",
      status: 400,
    });
  }
};

export const rentCar = async (req, res) => {
  try {
    const { car_id, origin, destination, hours_requirement } = req.body;

    const car = await prisma.car.findUnique({
      where: {
        id: car_id,
      },
    });
    const amount = hours_requirement * car.rent_per_hr;

    const { user } = req;

    const rentCar = await prisma.rent.create({
      data: {
        car_id: car.id,
        origin,
        destination,
        amount,
      },
    });
    return res.json({
      status: 200,
      message: "Car rented successfully.",
      rent_id: rentCar.id,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "No car awailable at the moment.",
      status: 400,
    });
  }
};

export const updateRent = async (req, res) => {
  try {
    const { car_id, ride_details } = req.body;

    const updateRent = await prisma.rent.updateFirst({
      where: {
        car_id: car_id,
        origin: ride_details.origin,
        destination: ride_details.destination,
      },
      data: {
        is_completed: true,
      },
    });

    return res.json({
      status: 200,
      message: "Car rented successfully.",
      rent_id: updateRent.id,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "No car available at the moment.",
      status: 400,
    });
  }
};
