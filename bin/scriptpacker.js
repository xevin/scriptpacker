#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ScriptPacker = require('..')

require('yargs') // eslint-disable-line
	.command('build [input]', 'Build the given file', (yargs) => {
		return yargs
			.positional('input', {
				describe: 'The input file to build',
				default: 'index.wren'
			})
			.option('output', {
				alias: 'o',
				describe: 'Where to write the file',
				type: 'string'
			})
			.option('minify', {
				alias: 'm',
				default: false,
				describe: 'Minify the output',
				type: 'boolean'
			})
			.option('prefix', {
				alias: 'p',
				default: '',
				describe: 'Text to prefix the output',
				type: 'string'
			})
			.option('print-paths', {
				alias: 's',
				default: true,
				describe: 'Print source path before source code',
				type: 'boolean'
			})
	}, (argv) => {
		const packer = new ScriptPacker(argv.input)
		const out = packer.pack(argv.minify, argv.prefix, argv['print-paths'])
		if (!argv.output) {
			const pathObject = path.parse(argv.input)
			argv.output = 'packed.' + packer.extension
		}

		fs.writeFileSync(argv.output, out)
	})
	.help()
	.demandCommand()
	.argv
