// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
		const meter = await pool.query('select id, balance from electricity_meter where street_id = $1', [streetId])
			return meter.rows
	}

	// return all the appliances
	async function appliances() {
		const appliances = await pool.query('select * from appliance');
			return appliances.rows

	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		const topup = await pool.query('update electricity_meter set meter_number = balance + 50 where id = $1', [meterId, units]);
			return topup.rows
	}
	
	// return the data for a given balance
	async function meterData(meterId) {
		const data = await pool.query('select balance from electricity_meter where id = $1', [meterId]);
			return data.rows
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		const decrease = await pool.query('update electricity_meter set meter_number = balance - 2 where id = $1', [meterId, units]);
		return decrease.rows
	}

	// total electricity used
	async function totalStreetBalance(balance){
		const total = await pool.query('select sum(street_id * balance) from electricity_meter where balance = $3', [balance]);
			return total.rows
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		totalStreetBalance
	}


}