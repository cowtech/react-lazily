VERSION=$(curl -s https://api.cdnjs.com/libraries/normalize | jq '.version' | sed -e 's#"##g');
NORMALIZE=$(curl -s https://cdnjs.cloudflare.com/ajax/libs/normalize/$VERSION/normalize.min.css)
sed -E -e "s_.+// placeholder:normalize\.css_  cssRaw('$NORMALIZE'); // placeholder:normalize\.css_" -i styling/reset.ts
echo "Updated to normalize.css $VERSION.";
