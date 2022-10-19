import React from "react";
import Images from "../../data";
import "./Commendation-Style.css";

const CardSelect = ({ onSelectImage }) => {
	return (
		<div className="main-container">
			<h1 className="heading-card">Commendation Cards</h1>
			<div className="img-container">
				<ul className="flex-center flex-option flex-xtra-option img-container-height ">
					{Images.map((image) => {
						return (
							<li className="position-declare" key={image.id} onClick={() => onSelectImage({ id: image.id, image: image.img })}>
								<span className="position-center-align">Image {image.id}</span>
								<img src={image.img} alt={image.id} />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default CardSelect;