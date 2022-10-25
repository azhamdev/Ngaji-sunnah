import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { Typography, Box, Stack } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

import { Videos } from "./"
import { fetchFromAPI } from "../utils/fetchFromAPI"

const VideoDetail = () => {
  const { id } = useParams()
  const [videoDetail, setVideoDetail] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState(null)

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    )

    // fetchFromAPI(`search?part=snippet&relatedToVideo=${id}$type=video`).then(
    //   (data) => setRelatedVideos(data.items)
    // )

    fetchFromAPI(`search?part=snippet&q=${id}`).then((data) =>
      setRelatedVideos(data.items)
    )
  }, [id])

  if (!videoDetail?.snippet) return "Loading ..."
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail

  return (
    <Box minHeight={"95vh"}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls={true}
            />
            <Typography variant="h5" color="#FFF" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={{
                color: "#FFF",
              }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  color="#FFF"
                  variant={{ sm: "subtitle1", md: "h6" }}
                >
                  {channelTitle}
                </Typography>
                <CheckCircle
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Link>
              <Stack direction={"row"} gap="20px" alignItems={"center"}>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 3, xs: 5 }} justifyContent="center">
          <Videos videos={relatedVideos} direction="column" />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail
