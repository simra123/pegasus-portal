// ** React Imports
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { useTranslation } from "react-i18next";

// ** Reactstrap Imports
import { Badge, Col, Row } from "reactstrap";
import { useContext } from "react";
import { Data } from "../../../../../context-hooks/index";
import { useSelector } from "react-redux";

const VerticalNavMenuLink = ({
	item,
	activeItem,
	setActiveItem,
	currentActiveItem,
}) => {
	// ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
	const LinkTag = item.externalLink ? "a" : NavLink;

	// ** Hooks
	const { t } = useTranslation();
	const location = useLocation();

	const store = useSelector((state) => state.portalData);

	useEffect(() => {
		if (currentActiveItem !== null) {
			setActiveItem(currentActiveItem);
		}
	}, [location]);

	return (
		<li
			className={classnames({
				"nav-item": !item.children,
				disabled: item.disabled,
				active: item.navLink === activeItem,
			})}>
			<LinkTag
				className='d-flex align-items-center'
				target={item.newTab ? "_blank" : undefined}
				/*eslint-disable */
				{...(item.externalLink === true
					? {
							href: item.navLink || "/",
					  }
					: {
							to: item.navLink || "/",
							isActive: (match) => {
								if (!match) {
									return false;
								}

								if (
									match.url &&
									match.url !== "" &&
									match.url === item.navLink
								) {
									currentActiveItem = item.navLink;
								}
							},
					  })}
				onClick={(e) => {
					if (
						item.navLink.length === 0 ||
						item.navLink === "#" ||
						item.disabled === true
					) {
						e.preventDefault();
					}
				}}>
				{item.icon}
				{item.id == "orders" ? (
					<>
						<span className='menu-item text-truncate'>{t(item.title)}</span>{" "}
						{store.notification_number != 0 &&
						store.notification_number != undefined ? (
							<span
								style={{
									marginTop: "4px",
									marginLeft: "70px",
									width: "20px",
									backgroundColor: "#f3ac3b",
									"border-radius": "50%",
									paddingLeft: store.notification_number < 9 ? "8px" : "4px",
									paddingRight: store.notification_number < 9 ? "8px" : "4px",
									paddingTop: "2px",
									color: "white",
									fontSize: "12px",
								}}>
								{store.notification_number}
							</span>
						) : (
							<></>
						)}
					</>
				) : (
					<span className='menu-item text-truncate'>{t(item.title)}</span>
				)}

				{item.badge && item.badgeText ? (
					<Badge
						className='ms-auto me-1'
						color={item.badge}
						pill>
						{item.badgeText}
					</Badge>
				) : null}
			</LinkTag>
		</li>
	);
};

export default VerticalNavMenuLink;
