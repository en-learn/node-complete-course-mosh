# watchreq () { watch -d -n 5 "curl $1 | jq" }

# watchreqgenre () { watchreq "http://localhost:3000$1" } 

# # Usage:
# # watchput [jsondata] [url]
# watchput () { watch -d -n 5 "$putcmd -d $1 $2 | jq"  }

# putcmd="curl -H 'Content-Type: application/json' -X PUT"

# # watchput [jsondata] [id]
# watchputgenre () { watchput "$1" "http://localhost:3000/api/genres/$2" }

# # curl -H 'Content-Type: application/json' -X PUT \
# # -d '{"name":"christmas"}' \
# # http://example.com/service

putcmd () {
  curl -H 'Content-Type: application/json' -X PUT \
  -d '{"name":"christmas"}' \
  http://localhost:3000/api/genres/1
}

putalias="curl -H 'Content-Type: application/json' -X PUT -d '{\"name\":\"christmas\"}' http://localhost:3000/api/genres/1"

watchtest () { watch -d -n 5 "curl -H 'Content-Type: application/json' -X PUT -d '{\"name\":\"christmas\"}' http://localhost:3000/api/genres/1 | jq" }

posttest () { watch -d -n 5 "curl -H 'Content-Type: application/json' -X POST -d '{\"name\":\"vlog\"}' http://localhost:3000/api/genres | jq" }

deletetest () { watch -d -n 5 "curl -H 'Content-Type: application/json' -X DELETE http://localhost:3000/api/genres/1 | jq" }
