import React, { Component } from 'react';

import ageL  from '../../assets/ages/A0.png';
import age10 from '../../assets/ages/A10.png';
import age12 from '../../assets/ages/A12.png';
import age14 from '../../assets/ages/A14.png';
import age16 from '../../assets/ages/A16.png';
import age18 from '../../assets/ages/A18.png';

export default class Age extends Component {
	render() {
		
		const pics = {
			"ageL"  : ageL,
			"age10" : age10,
			"age12" : age12,
			"age14" : age14,
			"age16" : age16,
			"age18" : age18,
		};

		const tgt_age = "age" + this.props.age;
		const pic = pics[tgt_age];		
		return (
			<img src={pic} alt=""/>
		);
	}
}
