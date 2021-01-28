const { http } = require("winston");
const { logger } = require("./app/config/logger");

let msgError = ('Error in active user:', e.message);
logger.error(msgError);
return res.status(401).send(msgError);


let msgInfo = '';



select hl.id_hackathon, l.url, l.web_name from link l left join hackathon_link hl on l.id = hl.id_link where hl.id_hackathon in (1, 2, 3, 4);


select hl.id_hackathon, l.url, l.web_name from link l
left join hackathon_link hl on l.id = hl.id_link
where hl.id_hackathon in (1, 2, 3, 4);