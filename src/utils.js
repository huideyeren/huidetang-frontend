const dateformat = require(`dateformat`);

exports.makeBlogPath = ({ createdAt, slug }) => {
  let date = Date.parse(createdAt);
  let year = dateformat(date, `yyyy`);
  let month = dateformat(date, `mm`);
  let day = dateformat(date, `dd`);
  console.log(`/${year}/${month}/${day}/${slug}/`)
  return `/${year}/${month}/${day}/${slug}/`;
};
