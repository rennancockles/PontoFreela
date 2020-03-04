inicio=$(date +%s)

# IOS
echo -en "Creating IOS icons 1/6 \r"
# [[ $1 == "round" ]] && convert matriz.png \( +clone  -alpha extract -draw 'fill black polygon 0,0 0,150 150,0 fill white circle 150,150 150,0' \( +clone -flip \) -compose Multiply -composite \( +clone -flop \) -compose Multiply -composite \) -alpha off -compose CopyOpacity -composite -resize 180x180 apple-touch-icon.png || convert matriz.png -resize 180x180 apple-touch-icon.png; 
convert matriz.png -resize 180x180 apple-touch-icon.png; 
echo -en "Creating IOS icons 2/6 \r"
convert apple-touch-icon.png -resize 180x180 apple-touch-icon-180x180.png; 
echo -en "Creating IOS icons 3/6 \r"
convert apple-touch-icon.png -resize 152x152 apple-touch-icon-152x152.png; 
echo -en "Creating IOS icons 4/6 \r"
convert apple-touch-icon.png -resize 120x120 apple-touch-icon-120x120.png; 
echo -en "Creating IOS icons 5/6 \r"
convert apple-touch-icon.png -resize 76x76 apple-touch-icon-76x76.png; 
echo -en "Creating IOS icons 6/6 \r\n"
convert apple-touch-icon.png -resize 60x60 apple-touch-icon-60x60.png; 

# Favicon
echo -en "Creating Favicon icons 1/3 \r"
[[ $1 == "round" ]] && convert matriz.png \( +clone  -alpha extract -draw 'fill black polygon 0,0 0,150 150,0 fill white circle 150,150 150,0' \( +clone -flip \) -compose Multiply -composite \( +clone -flop \) -compose Multiply -composite \) -alpha off -compose CopyOpacity -composite -resize 32x32 favicon-32x32.png || convert matriz.png -resize 32x32 favicon-32x32.png; 
# convert matriz.png -resize 32x32 favicon-32x32.png; 
echo -en "Creating Favicon icons 2/3 \r"
convert favicon-32x32.png -resize 16x16 favicon-16x16.png; 
echo -en "Creating Favicon icons 3/3 \r\n"
convert favicon-32x32.png ../../favicon.ico; 

# MS
echo -en "Creating MS icons 1/2 \r"
convert matriz.png -resize 150x150 mstile-150x150.png; 
echo -en "Creating MS icons 2/2 \r\n"
convert matriz.png -resize 144x144 msapplication-icon-144x144.png; 

# Android
echo -en "Creating Android icons 1/4 \r"
[[ $1 == "round" ]] && convert matriz.png -gravity center +repage \( +clone -threshold -1 -negate -fill white -draw "circle 350,350 350,0" \) -compose DstIn -composite -auto-orient android-chrome-512x512.png || convert matriz.png -resize 512x512 android-chrome-512x512.png; 

echo -e "Creating Android icons 2/4 \r"
convert android-chrome-512x512.png android-chrome-maskable-512x512.png; 
echo -e "Creating Android icons 3/4 \r"
convert android-chrome-512x512.png -resize 192x192 android-chrome-192x192.png; 
echo -e "Creating Android icons 4/4 \r\n"
convert android-chrome-512x512.png -resize 192x192 android-chrome-maskable-192x192.png; 

fim=$(date +%s)

echo 13 icons created in $(($fim-$inicio)) seconds
