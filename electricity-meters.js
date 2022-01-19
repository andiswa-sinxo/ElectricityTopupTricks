// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		try {
			const streets = await pool.query(`select * from street`);
			return streets.rows;
		} catch (error) {
			console.log(error)
		}
		
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
		try {
			const meter = await pool.query('select id, balance from electricity_meter where street_id = $1', [streetId])
			return meter.rows
		} catch (error) {
			console.log(error)
		}
		
	}

	// return all the appliances
	async function appliances() {
		try {
			const appliances = await pool.query('select * from appliance');
			return appliances.rows
		} catch (error) {
			console.log(error)
		}

	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		try {
			const topup = await pool.query('update electricity_meter set meter_number = balance + 50 where id = $1', [meterId, units]);
			return topup.rows
		} catch (error) {
			console.log(error)
		}
		
	}
	
	// return the data for a given balance
	async function meterData(meterId) {
		try {
			const data = await pool.query('select balance from electricity_meter where id = $1', [meterId]);
			return data.rows
		} catch (error) {
			console.log(error)
		}
		
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		try {
			const decrease = await pool.query('update electricity_meter set meter_number = balance - 2 where id = $1', [meterId, units]);
			return decrease.rows
		} catch (error) {
			console.log(error)
		}
		
	}

	// total electricity used
	async function totalStreetBalance(balance){
		try {
			const total = await pool.query('select sum(street_id * balance) from electricity_meter where balance = $3', [balance]);
			return total.rows
		} catch (error) {
			console.log(error)
		}
		
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