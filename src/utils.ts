import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

interface FunctionNode {
	name: string
	start: {
		column: number
		index: number
		line: number
	}
	end: {
		column: number
		index: number
		line: number
	}
}

// 考虑光标所在位置的
export const getFunctionCode = (code: string, index: number): FunctionNode | undefined => {
	let functionNode
	const ast = parse(code)
	traverse(ast, {
		FunctionDeclaration(path) {
			console.log(path)
			if (index >= path.node?.start! && index <= path.node?.end!) {
				functionNode = {
					name: path.node.id?.name,
					start: path.node.loc?.start,
					end: path.node.loc?.end
				}
			}
		},
		VariableDeclaration(path) {
			console.log('打印***path', path)
		}
	})
	return functionNode
}
