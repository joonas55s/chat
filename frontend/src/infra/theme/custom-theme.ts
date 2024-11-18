import {extendTheme} from '@chakra-ui/react'

export const customtheme = extendTheme({
	body: {
		bg: 'red',
	},
	components:{
		Button:{
			variants: {
				default: {
					bg:'#007964',
					color:'#FAFCFF',
				},
				icon:{
					color:'#011640'
					// color='#383838'
				}
			}
		},
		Heading:{
			variants:{
				// h1: {color:'#326FEE'},
				h1: {color:'#01403A'},
				h3: {color:'#2B9DF4'}
			}
		},
		Text:{
			variants:{
				// sub: {color:'#2B9DF4'}
				sub: {color:'#025959'},
				error: {color:'#BF3636'},
			}
		},
		Input: {
			baseStyle: {
				field: {
					bg: '#EEF2F5',
					// borderColor: '#4b4b4f',
					// borderWidth: 3,
					// ':focus': {
					//   borderColor: '#a970ff',
					//   bg: '#000'
					// }
				}
			},
		}
	}
})