#!/bin/zsh

for entry in $(ls entries); do
	echo $entry
	output_file=$(echo $entry | cut -d. -f1).html
	echo $output_file
done

