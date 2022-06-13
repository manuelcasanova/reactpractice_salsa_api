const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'development',
  host: 'localhost',
  database: 'salsa_development',
  password: 'development',
  port: 5432
});

const inMemorySteps = [
  {
    id: 1,
    title: 'Basic step',
    level_id: 1
  },
  {
    id: 2,
    title: 'Basic forward and backwards',
    level_id: 1
  },
  {
    id: 3,
    title: 'Dile que no',
    level_id: 1
  },
]

const inMemoryLevels = [
  {
    id: 1,
    title: 'Beginner',
    description: 'This will be your introduction to the world of Cuban dances.'
  }
]

// const getAllSteps = async (request, response) => {
//   if (response) {
//     pool.query('SELECT * FROM steps', (error, results) => {
//       response.status(200).json(results.rows);
//     });
//   } else {
//     response.status(200).json(inMemorySteps);
//   }
// };

const getAllSteps = async (request, response) => {
  if (response) {
    pool.query('SELECT steps.id AS step_id, steps.title AS step_title, levels.title AS level_title, steps.level_id FROM steps JOIN levels on steps.level_id = levels.id', (error, results) => {
      response.status(200).json(results.rows);
    });
  } else {
    response.status(200).json(inMemorySteps);
  }
};


const getAllLevels = async (request, response) => {
  if (response) {
    pool.query('SELECT * FROM levels', (error, results) => {
      response.status(200).json(results.rows);
    });
  } else {
    response.status(200).json(inMemoryLevels);
  }
};

const getStepById = async (request, response) => {
  const id = parseInt(request.params.id);
  if (response) {
    pool.query('SELECT * FROM steps WHERE id =$1', [id], (error, results) => {
      response.status(200).json(results.rows);
    });
  } else {
    response.status(200).json(inMemoryLevels);
  }
};

const getLevelById = async (request, response) => {
  const id = parseInt(request.params.id);
  if (response) {
    pool.query('SELECT * FROM levels WHERE id =$1', [id], (error, results) => {
      response.status(200).json(results.rows);
    });
  } else {
    response.status(200).json(inMemorySteps);
  }
};


const addStep = async (request, response) => {
  const { title } = request.body;
  let level_id;

    if (request.body.level === "Beginner") {
      level_id = 1;
    } else if (request.body.level === "Intermediate") {
      level_id = 2;
    } else if (request.body.level === "Intermediate 2") {
      level_id = 3;
    } else if (request.body.level === "Advanced") {
      level_id = 4;
    } else if (request.body.level === "Advanced 2") {
      level_id = 5;
    } else if (request.body.level === "Hardcore") {
      level_id = 6;
    }

  if (response) {
    console.log("Added step id:", request.body)

    // console.log("req.body", request.body)
    // console.log("req.body.level", request.body.level)


    pool.query('INSERT INTO steps (title, level_id) VALUES ($1, $2) RETURNING *', [title, level_id], (error, results) => {
      // console.log("results.rows:", results.rows)
      response.status(201).send(results.rows[0])
    });
  } else {
    response.status(200).json(inMemorySteps); 
  }
};

const editStep = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, level_id } = request.body;
  pool.query(
    'UPDATE steps SET title = $1, level_id = $2 WHERE id = $3', [title, level_id, id], (error, results) => {
      response.status(200).send(`Step with id ${id} modified.`);
    }
  );
};

const deleteStep = (request, response) => {
  const id = parseInt(request.params.id);
  console.log("Deleted step id:", id) //Can see this in the terminal
  pool.query('DELETE FROM steps WHERE id = $1 RETURNING *', [id], (error, results) => {
    response.status(200).send(`Step with id ${id} deleted.`); //Can see this on Inspect-Network-Response
  });
};


module.exports = {
  getAllSteps,
  getAllLevels,
  getStepById,
  getLevelById,
  addStep,
  editStep,
  deleteStep
};