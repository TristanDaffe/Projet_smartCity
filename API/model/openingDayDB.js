module.exports.getOpeningDay = async (id, client) => {
    return await client.query("SELECT * FROM opening_day WHERE id = $1", [id]);
}

module.exports.getOpeningForDay = async (day, client) => {
    return await client.query("SELECT * FROM opening_day WHERE day_label = $1", [day]);
}

module.exports.createOpeningDay = async (dayLabel, openingTime, closingTime, client) => {
    return await client.query("INSERT INTO opening_day (day_label, opening_time, closing_time) VALUES ($1, $2, $3) RETURNING *", 
    [dayLabel, openingTime, closingTime]);
}

module.exports.updateOpeningDay = async (id, dayLabel, openingTime, closingTime, client) => {
    return await client.query("UPDATE opening_day SET day_label = $1, opening_time = $2, closing_time = $3 WHERE id = $4 RETURNING *", 
    [dayLabel, openingTime, closingTime, id]);
}

module.exports.deleteOpeningDay = async (id, client) => {
    return await client.query("DELETE FROM opening_day WHERE id = $1", [id]);
}

module.exports.getAllOpeningDays = async (client) => {
    return await client.query("SELECT * FROM opening_day order by id");
}

module.exports.getOpeningDaysForCenter = async (id, client) => {
    return await client.query("SELECT * FROM opening_day WHERE id IN (SELECT day_id FROM open_day WHERE center_id = $1)", [id]);
}

module.exports.OpeningDayIsUse = async (id, client) => {
    const isUse =  await client.query("SELECT * FROM open_day WHERE day_id = $1 LIMIT 1", [id]) !== undefined;
    return isUse;
}