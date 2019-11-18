import React from 'react';

import ageL  from '../../assets/ages/A0.png';
import age10 from '../../assets/ages/A10.png';
import age12 from '../../assets/ages/A12.png';
import age14 from '../../assets/ages/A14.png';
import age16 from '../../assets/ages/A16.png';
import age18 from '../../assets/ages/A18.png';

const pics = {
	"L"  : ageL,
	"10" : age10,
	"12" : age12,
	"14" : age14,
	"16" : age16,
	"18" : age18,
};

export default function Age(props) {
	const pic = pics[props.age];		
	return (
		<img src={pic} alt=""/>
	);
}

