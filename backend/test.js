const { http } = require("winston");
const { logger } = require("./app/config/logger");

let msgError = e.message || 'Error in login';
logger.error('Error login', msgError);
res.status(401).send(msgError);





select hl.id_hackathon, l.url, l.web_name from link l left join hackathon_link hl on l.id = hl.id_link where hl.id_hackathon in (1, 2, 3, 4);


select hl.id_hackathon, l.url, l.web_name from link l
left join hackathon_link hl on l.id = hl.id_link
where hl.id_hackathon in (1, 2, 3, 4);