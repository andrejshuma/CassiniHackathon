import { useState } from "react";

function Test() {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
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
		setLoading(true);
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
					console.log("result:", result);
					setData(result.data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		};
		const error = () => {
			alert("niso ne praime bez lokacija bratce");
		};

		navigator.geolocation.getCurrentPosition(success, error);
		setLoading(false);
	};

	return (
		<div>
			<button
				onClick={sendLocation}
				className="btn-primary p-4 bg-amber-600 hover:bg-amber-700 cursor-pointer"
			>
				send location
			</button>

			<div>
				{loading ? (
					"use malce cek...."
				) : !data ? (
					"cekaj"
				) : (
					<div>
						{Object.keys(data).map((key) => (
							<div key={key}>
								{key}:{" "}
								{typeof data[key] === "object"
									? Object.keys(data[key]).map((key2) => (
											<span key={key2}>
												{JSON.stringify(data[key][key2])},{" "}
											</span>
									  ))
									: JSON.stringify(data[key])}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Test;
