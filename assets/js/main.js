//==============Variables==============

// vat types
const gross = document.getElementById("gross");
const net = document.getElementById("net");

// vat percentage
const type19 = document.getElementById("type19");
const type7 = document.getElementById("type7");

// input field
const priceField = document.getElementById("price");

// input field label
const priceLabel = document.querySelector(".price");

// output fields
const vatPrice = document.getElementById("vat-price");
const total = document.getElementById("total");

// output field label
const totalLabel = document.querySelector(".total");

//==============Functions==============

// change innerHTML depending on which option is checked
function chooseType() {
	if (net.checked) {
		priceLabel.innerHTML = "Bruttobetrag (Preis mit Mehrwersteuer) in Euro";
		totalLabel.innerHTML = "Nettobetrag (Endpreis)";
		calculateVatValue();
	} else {
		priceLabel.innerHTML = "Nettobetrag (Preis ohne Mehrwersteuer) in Euro";
		totalLabel.innerHTML = "Bruttobetrag (Endpreis)";
		calculateVatValue();
	}
}

// choose percentage to use for calculation
function choosePercentage() {
	if (type19.checked) {
		return getPercent(type19);
	} else {
		return getPercent(type7);
	}
}

// get value for percentage calculation
function getPercent(type) {
	return parseInt(type.value) / 100;
}

// calculating vat values
function calculateVatValue() {
	if (
		priceField.value > 0 &&
		(gross.checked || net.checked) &&
		(type19.checked || type7.checked)
	) {
		let input = parseInt(priceField.value);
		let percentage = choosePercentage();
		let partial;
		let totalValue;

		if (gross.checked) {
			partial = input * percentage;
			totalValue = input + partial;
		} else if (net.checked) {
			partial = (input / (1 + percentage)) * percentage;
			totalValue = input - partial;
		}
		vatPrice.innerHTML = `${partial.toFixed(2)} €`;
		vatPrice.innerHTML = vatPrice.innerHTML.replaceAll(".", ",");
		total.innerHTML = `${totalValue.toFixed(2)} €`;
		total.innerHTML = total.innerHTML.replaceAll(".", ",");
	}
}
