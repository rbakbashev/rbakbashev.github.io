#!/bin/zsh

for entry in $(ls entries); do
	echo $entry

	entry_header=$(head -n5 entries/$entry)
	entry_rest=$(tail -n+7 entries/$entry)

	echo $entry_header
	echo "ALKWJDLAKJWD"
	echo $entry_rest

	output_file=$(echo $entry | cut -d. -f1).html
	echo $output_file
done

