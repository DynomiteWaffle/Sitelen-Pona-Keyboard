local json = require("json")
local words = {}
-- load KKCSV.txt
local input = io.open("kkCSV.txt", "r")
-- prosses
local w = input:read("l")
while w ~= nil do
    -- prosses line
    local uscr = string.sub(w, 0, string.find(w, ";") - 1) -- get uscr
    w = string.sub(w, string.find(w, ";") + 1)             -- removes uscr

    -- get type
    local type = ""
    if string.match(w, "IDEOGRAPH") == "IDEOGRAPH" then
        type = "Ideograph"
        w = string.sub(w, #"SITELEN PONA IDEOGRAPH " + 1) -- removes "SITELEN PONA IDEOGRAPH "
    else
        type = "Punctuation"
        w = string.sub(w, #"SITELEN PONA " + 1) -- removes "SITELEN PONA "
    end

    local name = string.sub(w, 0, string.find(w, ";") - 1) -- get name

    -- add to words
    words[#words + 1] = {
        uscr = uscr,
        type = type,
        name = name
    }
    -- get new line
    w = input:read("l")
end
input:close()
-- output in json to sitelen.json
local output = io.open("sitelen.json", "w+")
output:write(json.encode(words))
output:close()
