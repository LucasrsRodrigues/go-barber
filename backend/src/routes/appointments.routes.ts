import { Router, response} from 'express';
import { getCustomRepository } from 'typeorm';

import { startOfHour, parseISO} from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
// SoC: Separation of Concerns (separacao de preocupacao)

appointmentsRouter.get('/', async (req, res) => {
   const appointmentRepository = getCustomRepository(AppointmentRepository);
   const appointments = await appointmentRepository.find();

   return res.json(appointments);
});


appointmentsRouter.post('/',async ( req, res )=>{
      const { provider_id, date } = req.body;


      const parsedDate = parseISO(date);
      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

      return res.json(appointment);


});


export default appointmentsRouter;
