import { useState } from "react";

function Test() {
	const [data, setData] = useState();
	// useEffect(() => {
	// 	const GET = () => {
	// 		fetch("http://127.0.0.1:8000/index/")
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				setData(data.message);
	// 				console.log(data);
	// 			});
	// 	};
	// 	GET();
	// }, []);

	const sendLocation = () => {
		const success = (position) => {
			const url = "http://127.0.0.1:8000/api/data/";
			const data = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			};

			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.json();
				})
				.then((result) => {
					console.log("uv", result.uv);
					console.log("uv", result.pollen);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		};
		const error = () => {
			alert("niso ne praime bez lokacija bratce");
		};

		navigator.geolocation.getCurrentPosition(success, error);
	};

	return (
		<div>
			<button onClick={sendLocation}>send location</button>
		</div>
	);
}

export default Test;
