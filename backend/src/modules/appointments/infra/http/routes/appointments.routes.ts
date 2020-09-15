import { Router} from 'express';

import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
// SoC: Separation of Concerns (separacao de preocupacao)
const appointmentRepository = new AppointmentRepository();

// appointmentsRouter.get('/', async (req, res) => {

//    const appointments = await appointmentRepository.find();

//    return res.json(appointments);
// });


appointmentsRouter.post('/',async ( req, res )=>{
      const { provider_id, date } = req.body;


      const parsedDate = parseISO(date);
      const createAppointment = new CreateAppointmentService(appointmentRepository);

      const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

      return res.json(appointment);
});


export default appointmentsRouter;
