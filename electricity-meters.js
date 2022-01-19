// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	function streetMeters(streetId) {
		const meter = await pool.query('select street_number, balance from electricity_meter where street_id = $1', [streetId])
			return meter.rows
	}

	// return all the appliances
	function appliances() {
		const appliances = await pool.query('select * from appliances');
			return appliances.rows

	}

	// increase the meter balance for the meterId supplied
	function topupElectricity(meterId, units) {
		const topup = await pool.query('update electricity_meter set balance + $3 where ')
	}
	
	// return the data for a given balance
	function meterData(meterId) {
	
	}

	// decrease the meter balance for the meterId supplied
	function useElectricity(meterId, units) {
	
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity
	}


}