import {createSlice} from "@reduxjs/toolkit"

const menus = ["home", "findQuestion", "about", "work", "contact"]
const headerSlice = createSlice({
	name: 'header',
	initialState: {
		current: `${menus.indexOf(window.location.hash.replace("#/", ""))}`,
		menus
	},
	reducers: {
		setCurrent: (state, action) => {
			const {current} = action.payload
			state.current = current
		},
	},
})

export const {setCurrent} = headerSlice.actions

export default headerSlice.reducer

export const selectCurrentHeader = (state) => state.header.current
export const selectMenus = (state) => state.header.menus